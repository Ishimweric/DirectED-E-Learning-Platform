import express from 'express';
import { getStudentDashboard, getStudentActivity } from '../controllers/studentDashboard';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

// @route   GET /api/student/dashboard
// @desc    Get student dashboard data
// @access  Private (Student)
router.get('/dashboard', authenticate, authorize('Student'), getStudentDashboard);

// @route   GET /api/student/activity
// @desc    Get student activity
// @access  Private (Student)
router.get('/activity', authenticate, authorize('Student'), getStudentActivity);

export default router;