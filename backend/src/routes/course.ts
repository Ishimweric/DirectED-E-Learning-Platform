import express from 'express';
import { body } from 'express-validator';
import {
  getCourses,
  getFeaturedCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollInCourse,
} from '../controllers/course';
import { authenticate, authorize } from '../middleware/auth';
import upload from '../middleware/upload';

const router = express.Router();

router.get('/', getCourses);
router.get('/featured', getFeaturedCourses);
router.get('/:id', getCourse);
router.post(
  '/',
  authenticate,
  authorize('Instructor'),
  upload.single('thumbnail'),
  [
    body('title', 'Title is required').not().isEmpty(),
    body('description', 'Description is required').not().isEmpty(),
    body('category', 'Category is required').not().isEmpty(),
    body('level', 'Level must be beginner, intermediate, or advanced').isIn([
      'beginner',
      'intermediate',
      'advanced',
    ]),
    body('price', 'Price must be a positive number').isFloat({ min: 0 }),
  ],
  createCourse
);

router.put(
  '/:id',
  authenticate,
  authorize('Instructor'),
  upload.single('thumbnail'),
  [
    body('title', 'Title is required').optional().not().isEmpty(),
    body('description', 'Description is required').optional().not().isEmpty(),
    body('category', 'Category is required').optional().not().isEmpty(),
    body('level', 'Level must be beginner, intermediate, or advanced')
      .optional()
      .isIn(['beginner', 'intermediate', 'advanced']),
    body('price', 'Price must be a positive number').optional().isFloat({ min: 0 }),
  ],
  updateCourse
);

router.delete('/:id', authenticate, authorize('Instructor'), deleteCourse);
router.post('/:id/enroll', authenticate, authorize('Student'), enrollInCourse);

export default router;