import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Course from '../models/Course';
import Lesson from '../models/Lesson';
import Quiz from '../models/Quiz';
import Enrollment from '../models/Enrollment';
import { AuthRequest } from '../middleware/auth';
import { ApiResponse } from '../types';

export const getCourses = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    
    const search = req.query.search as string || '';
    const category = req.query.category as string || '';
    const level = req.query.level as string || '';
    const minPrice = parseFloat(req.query.minPrice as string) || 0;
    const maxPrice = parseFloat(req.query.maxPrice as string) || Number.MAX_SAFE_INTEGER;

    let query: any = { isPublished: true };
    
    if (search) {
      query.$text = { $search: search };
    }
    
    if (category) {
      query.category = category;
    }
    
    if (level) {
      query.level = level;
    }
    
    query.price = { $gte: minPrice, $lte: maxPrice };

    const courses = await Course.find(query)
      .populate('instructor', 'firstName lastName avatar')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Course.countDocuments(query);

    const response: ApiResponse = {
      success: true,
      message: 'Courses fetched successfully',
      data: {
        courses,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getFeaturedCourses = async (req: Request, res: Response): Promise<void> => {
  try {
    const courses = await Course.find({ isPublished: true })
      .populate('instructor', 'firstName lastName avatar')
      .sort({ studentsEnrolled: -1, rating: -1 })
      .limit(8);

    const response: ApiResponse = {
      success: true,
      message: 'Featured courses fetched successfully',
      data: courses,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('instructor', 'firstName lastName avatar bio skills')
      .populate({
        path: 'lessons',
        select: 'title description duration order',
      });

    if (!course) {
      res.status(404).json({ success: false, message: 'Course not found' });
      return;
    }

    const response: ApiResponse = {
      success: true,
      message: 'Course fetched successfully',
      data: course,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const createCourse = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ success: false, message: 'Invalid data', errors: errors.array() });
      return;
    }

    const course = new Course({
      ...req.body,
      instructor: req.user._id,
    });

    await course.save();
    
    // Add course to instructor's courses array
    if (req.user.role === 'instructor') {
      req.user.courses.push(course._id);
      await req.user.save();
    }

    const response: ApiResponse = {
      success: true,
      message: 'Course created successfully',
      data: course,
    };

    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateCourse = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ success: false, message: 'Invalid data', errors: errors.array() });
      return;
    }

    let course = await Course.findById(req.params.id);
    
    if (!course) {
      res.status(404).json({ success: false, message: 'Course not found' });
      return;
    }

    // Check if user is the instructor of the course
    if (course.instructor.toString() !== req.user._id.toString()) {
      res.status(403).json({ success: false, message: 'Not authorized to update this course' });
      return;
    }

    course = await Course.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    const response: ApiResponse = {
      success: true,
      message: 'Course updated successfully',
      data: course,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const deleteCourse = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      res.status(404).json({ success: false, message: 'Course not found' });
      return;
    }

    // Check if user is the instructor of the course
    if (course.instructor.toString() !== req.user._id.toString()) {
      res.status(403).json({ success: false, message: 'Not authorized to delete this course' });
      return;
    }

    await Course.findByIdAndDelete(req.params.id);
    
    // Remove course from instructor's courses array
    if (req.user.role === 'instructor') {
      req.user.courses = req.user.courses.filter(
        (courseId: any) => courseId.toString() !== req.params.id
      );
      await req.user.save();
    }

    // Delete all lessons and quizzes associated with the course
    await Lesson.deleteMany({ course: req.params.id });
    await Quiz.deleteMany({ course: req.params.id });

    const response: ApiResponse = {
      success: true,
      message: 'Course deleted successfully',
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const enrollInCourse = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      res.status(404).json({ success: false, message: 'Course not found' });
      return;
    }

    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({
      student: req.user._id,
      course: req.params.id,
    });

    if (existingEnrollment) {
      res.status(400).json({ success: false, message: 'Already enrolled in this course' });
      return;
    }

    // Create enrollment
    const enrollment = new Enrollment({
      student: req.user._id,
      course: req.params.id,
    });

    await enrollment.save();

    // Add course to student's enrolled courses
    req.user.enrolledCourses.push(course._id);
    await req.user.save();

    // Increment students enrolled count
    course.studentsEnrolled += 1;
    await course.save();

    const response: ApiResponse = {
      success: true,
      message: 'Enrolled in course successfully',
      data: enrollment,
    };

    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};