import express from 'express';
import { body } from 'express-validator';
import {
  getLessons,
  getLesson,
  createLesson,
  updateLessonProgress,
} from '../controllers/lesson';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

// @route   GET /api/courses/:courseId/lessons
// @desc    Get all lessons for a course
// @access  Private
router.get('/courses/:courseId/lessons', authenticate, getLessons);

// @route   GET /api/lessons/:id
// @desc    Get lesson by ID
// @access  Private
router.get('/:id', authenticate, getLesson);

// @route   POST /api/lessons
// @desc    Create a lesson
// @access  Private (Instructor)
router.post(
  '/',
  authenticate,
  authorize('Instructor'),
  [
    body('title', 'Title is required').not().isEmpty(),
    body('description', 'Description is required').not().isEmpty(),
    body('course', 'Course ID is required').isMongoId(),
    body('duration', 'Duration must be a positive number').isFloat({ min: 0 }),
    body('order', 'Order must be a positive integer').isInt({ min: 0 }),
  ],
  createLesson
);

// @route   PUT /api/lessons/:id/progress
// @desc    Update lesson progress
// @access  Private (Student)
router.put(
  '/:id/progress',
  authenticate,
  authorize('Student'),
  [
    body('isCompleted', 'isCompleted must be a boolean').optional().isBoolean(),
    body('timeSpent', 'timeSpent must be a positive number').optional().isFloat({ min: 0 }),
  ],
  updateLessonProgress
);

export default router;