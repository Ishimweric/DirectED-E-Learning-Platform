import express from 'express';
import { body } from 'express-validator';
import { authorize } from '../middleware/auth';
import {
  getQuiz,
  submitQuiz,
  getQuizAttempts,
  createQuiz
} from '../controllers/quiz';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.post(
  '/',
  authenticate,
  authorize('Instructor'),
  [
    body('title', 'Title is required').not().isEmpty(),
    body('description', 'Description is required').not().isEmpty(),
    body('questions', 'Questions are required').isArray({ min: 1 }),
    body('questions.*.question', 'Question text is required').not().isEmpty(),
    body('questions.*.type', 'Question type must be multiple-choice, true-false, or short-answer')
      .isIn(['multiple-choice', 'true-false', 'short-answer']),
    body('questions.*.points', 'Points must be a positive number').isInt({ min: 1 }),
    body('questions.*.correctAnswer', 'Correct answer is required').not().isEmpty(),
    body('timeLimit', 'Time limit must be a positive number').optional().isInt({ min: 0 }),
    body('passingScore', 'Passing score must be between 0 and 100').isInt({ min: 0, max: 100 }),
    body('maxAttempts', 'Max attempts must be a positive number').optional().isInt({ min: 1 }),
    body('lessonId', 'Lesson ID must be a valid ID').optional().isMongoId(),
    body('courseId', 'Course ID must be a valid ID').optional().isMongoId()
  ],
  createQuiz
);

// @route   GET /api/quizzes/:id
// @desc    Get quiz by ID
// @access  Private
router.get('/:id', authenticate, getQuiz);

// @route   POST /api/quizzes/:id/submit
// @desc    Submit quiz answers
// @access  Private (Student)
router.post(
  '/:id/submit',
  authenticate,
  [
    body('answers', 'Answers are required').isArray(),
    body('answers.*.question', 'Question ID is required').isMongoId(),
    body('answers.*.answer', 'Answer is required').not().isEmpty(),
    body('timeSpent', 'Time spent is required').isFloat({ min: 0 }),
  ],
  submitQuiz
);

// @route   GET /api/quizzes/:id/attempts
// @desc    Get quiz attempts
// @access  Private
router.get('/:id/attempts', authenticate, getQuizAttempts);

export default router;