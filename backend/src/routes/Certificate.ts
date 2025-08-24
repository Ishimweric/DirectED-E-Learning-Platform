// src/routes/certificate.ts
import express from 'express';
import { generateCertificate, getCertificate } from '../controllers/Certificate';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

// @route   POST /api/certificates/:courseId/generate
// @desc    Generate certificate for completed course
// @access  Private (Student)
router.post('/:courseId/generate', authenticate, authorize('student'), generateCertificate);

// @route   GET /api/certificates/:verificationCode
// @desc    Get certificate by verification code
// @access  Public
router.get('/:verificationCode', getCertificate);

export default router;