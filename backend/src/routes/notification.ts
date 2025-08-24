import express from 'express';
import { body } from 'express-validator';
import {
  getNotifications,
  markAsRead,
  sendNotification,
} from '../controllers/notification';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

// @route   GET /api/notifications
// @desc    Get user notifications
// @access  Private
router.get('/', authenticate, getNotifications);

// @route   POST /api/notifications/mark-read
// @desc    Mark notifications as read
// @access  Private
router.post(
  '/mark-read',
  authenticate,
  [
    body('notificationIds', 'Notification IDs are required').isArray(),
    body('notificationIds.*', 'Each notification ID must be a valid ID').isMongoId(),
  ],
  markAsRead
);

// @route   POST /api/notifications/send
// @desc    Send notifications to course students (Instructor only)
// @access  Private (Instructor)
router.post(
  '/send',
  authenticate,
  authorize('instructor'),
  [
    body('courseId', 'Course ID is required').isMongoId(),
    body('title', 'Title is required').not().isEmpty(),
    body('message', 'Message is required').not().isEmpty(),
    body('sendEmail', 'sendEmail must be a boolean').optional().isBoolean(),
  ],
  sendNotification
);

export default router;