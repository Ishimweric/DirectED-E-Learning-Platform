import express from 'express';
import { body } from 'express-validator';
import { sendMessage, getChatHistory } from '../controllers/chat';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// @route   POST /api/chat/message
// @desc    Send message to AI assistant
// @access  Private
router.post(
  '/message',
  authenticate,
  [
    body('message', 'Message is required').not().isEmpty(),
    body('courseId', 'Course ID must be a valid ID').optional().isMongoId(),
    body('lessonId', 'Lesson ID must be a valid ID').optional().isMongoId(),
  ],
  sendMessage
);

// @route   GET /api/chat/history
// @desc    Get chat history
// @access  Private
router.get('/history', authenticate, getChatHistory);

export default router;