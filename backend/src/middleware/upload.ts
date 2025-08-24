import multer from 'multer';
import { Request } from 'express';

// Configure multer for memory storage
const storage = multer.memoryStorage();

// File filter function
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Check file types
  if (file.mimetype.startsWith('image/') || 
      file.mimetype === 'application/pdf' ||
      file.mimetype.startsWith('video/')) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type'));
  }
};

// Configure multer
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter,
});

export default upload;