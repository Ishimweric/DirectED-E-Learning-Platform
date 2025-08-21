import { Router } from 'express';
import { getStudentDashboardData, enrollInCourse, getRecentActivity } from '../controllers/studentDashboardController';
// import { protect } from '../middleware/auth'

const router = Router();

// This route returns all the data needed for the student dashboard view.
// GET /api/student/dashboard
router.get('/dashboard', getStudentDashboardData);

// This route handles a student enrolling in a course.
// POST /api/enrollments
router.post('/enrollments', enrollInCourse);

// This route provides a feed of the student's most recent learning activity.
// GET /api/student/activity
router.get('/activity', getRecentActivity);

export default router;
