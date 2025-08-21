import { Router } from 'express';
import { createQuiz, getQuizByLessonId, submitQuiz, getQuizById } from '../controllers/quizController';
// import { protect, authorize } from '../middleware/auth';

const router = Router();

// router.post('/', protect, authorize('instructor', 'admin'), createQuiz);
router.post('/', createQuiz);

// router.get('/lesson/:lessonId', protect, getQuizByLessonId);
router.get('/lesson/:lessonId', getQuizByLessonId);

// router.get('/:quizId', protect, getQuizById);
router.get('/:quizId', getQuizById);

// router.post('/submit/:quizId', protect, submitQuiz);
router.post('/submit/:quizId', submitQuiz);

export default router;
