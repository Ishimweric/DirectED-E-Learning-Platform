import express from 'express';
import { body } from 'express-validator';
import {
  getInstructorDashboard,
  getInstructorCourses,
  getCourseStudents,
  publishCourse,
} from '../controllers/instructorDashboard';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

// @route   GET /api/instructor/dashboard
// @desc    Get instructor dashboard data
// @access  Private (Instructor)
router.get('/dashboard', authenticate, authorize('Instructor'), getInstructorDashboard);

// @route   GET /api/instructor/courses
// @desc    Get instructor's courses
// @access  Private (Instructor)
router.get('/courses', authenticate, authorize('Instructor'), getInstructorCourses);

// @route   GET /api/instructor/students/:courseId
// @desc    Get students for a course
// @access  Private (Instructor)
router.get('/students/:courseId', authenticate, authorize('Instructor'), getCourseStudents);

// @route   POST /api/instructor/courses/:courseId/publish
// @desc    Publish/unpublish a course
// @access  Private (Instructor)
router.post(
  '/courses/:courseId/publish',
  authenticate,
  authorize('Instructor'),
  [
    body('isPublished', 'isPublished must be a boolean').isBoolean(),
  ],
  publishCourse
);

export default router;