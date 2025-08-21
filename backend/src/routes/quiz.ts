import { Router } from 'express';
import { createQuiz, getQuizById } from '../controllers/quizController';

// import { protect, authorize } from '../middleware/auth';

const router = Router();

// Route to create a new quiz (instructor-facing)
// router.post('/', protect, authorize('instructor', 'admin'), createQuiz);
router.post('/', createQuiz);

// Route to get a specific quiz by its ID
// router.get('/:quizId', protect, getQuizById);
router.get('/:quizId', getQuizById);

export default router;
