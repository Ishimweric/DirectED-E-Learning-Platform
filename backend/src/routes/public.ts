import express from 'express';
import { getTestimonials, getPlatformStats } from '../controllers/public';

const router = express.Router();

// @route   GET /api/testimonials
// @desc    Get testimonials for landing page
// @access  Public
router.get('/testimonials', getTestimonials);

// @route   GET /api/platform/stats
// @desc    Get platform statistics
// @access  Public
router.get('/platform/stats', getPlatformStats);

export default router;