import express from 'express';
import { uploadToCloudinary } from '../config/cloudinary';
import upload from '../middleware/upload';
import { authenticate } from '../middleware/auth';
import { ApiResponse } from '../types';

const router = express.Router();

// @route   POST /api/upload/document
// @desc    Upload document to cloud storage
// @access  Private
router.post('/document', authenticate, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      const response: ApiResponse = {
        success: false,
        message: 'No file uploaded',
      };
      return res.status(400).json(response);
    }

    // Upload to Cloudinary
    const result = await uploadToCloudinary(req.file);

    const response: ApiResponse = {
      success: true,
      message: 'File uploaded successfully',
      data: {
        url: result.secure_url,
        publicId: result.public_id,
        format: result.format,
        bytes: result.bytes,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    
    const response: ApiResponse = {
      success: false,
      message: 'File upload failed',
    };
    
    res.status(500).json(response);
  }
});

export default router;