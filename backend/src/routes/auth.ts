import express from 'express';
import { body } from 'express-validator';
import { register, login, getMe } from '../controllers/auth';
import { authenticate } from '../middleware/auth';
import { forgotPassword } from '../controllers/auth';
import { resetPassword } from '../controllers/auth';

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register user
// @access  Public
router.post(
  '/register',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    body('firstName', 'First name is required').not().isEmpty(),
    body('lastName', 'Last name is required').not().isEmpty(),
    body('role', 'Role must be student or instructor').isIn(['student', 'instructor']),
  ],
  register
);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post(
  '/login',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists(),
  ],
  login
);

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', authenticate, getMe);

router.post('/forgotpassword', [
  body('email', 'Please include a valid email').isEmail(),
], forgotPassword);

// @route   PUT /api/auth/resetpassword/:token
// @desc    Reset password
// @access  Public
router.put('/resetpassword/:token', [
  body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
], resetPassword);

export default router;