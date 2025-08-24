import express from 'express';
import { getCourseProgress } from '../controllers/progress';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

// @route   GET /api/progress/course/:id
// @desc    Get course progress data
// @access  Private (Student)
router.get('/course/:id', authenticate, authorize('Student'), getCourseProgress);

export default router;