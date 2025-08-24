import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Lesson from '../models/Lesson';
import Course from '../models/Course';
import LessonProgress from '../models/LessonProgress';
import { AuthRequest } from '../middleware/auth';
import { ApiResponse } from '../types';

export const getLessons = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const courseId = req.params.courseId;
    const userId = req.user._id;

    // Check if user is enrolled in the course
    const isEnrolled = req.user.enrolledCourses.some(
      (course: any) => course.toString() === courseId
    );

    let lessons;
    if (isEnrolled || req.user.role === 'instructor') {
      // Get all lessons for enrolled users or instructors
      lessons = await Lesson.find({ course: courseId }).sort({ order: 1 });
    } else {
      // Get only preview lessons for non-enrolled users
      lessons = await Lesson.find({ course: courseId, isPreview: true }).sort({ order: 1 });
    }

    // For non-enrolled users, just return the lessons
    if (!isEnrolled) {
      const response: ApiResponse = {
        success: true,
        message: 'Lessons fetched successfully',
        data: lessons,
      };

      res.status(200).json(response);
      return;
    }

    // For enrolled users, get progress for each lesson
    const lessonsWithProgress = await Promise.all(
      lessons.map(async (lesson) => {
        const progress = await LessonProgress.findOne({
          student: userId,
          lesson: lesson._id,
        });
        return {
          ...lesson.toObject(),
          progress: progress || { isCompleted: false, timeSpent: 0 },
        };
      })
    );

    const response: ApiResponse = {
      success: true,
      message: 'Lessons fetched successfully',
      data: lessonsWithProgress,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getLesson = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    
    if (!lesson) {
      res.status(404).json({ success: false, message: 'Lesson not found' });
      return;
    }

    // Check if user has access to this lesson
    const isEnrolled = req.user.enrolledCourses.some(
      (course: any) => course.toString() === lesson.course.toString()
    );

    if (!lesson.isPreview && !isEnrolled && req.user.role !== 'instructor') {
      res.status(403).json({ success: false, message: 'Not enrolled in this course' });
      return;
    }

    // Get progress if user is enrolled
    let progress = null;
    if (isEnrolled) {
      progress = await LessonProgress.findOne({
        student: req.user._id,
        lesson: req.params.id,
      });
      
      // Update last accessed time
      if (progress) {
        progress.lastAccessed = new Date();
        await progress.save();
      } else {
        // Create progress record if it doesn't exist
        progress = new LessonProgress({
          student: req.user._id,
          lesson: req.params.id,
        });
        await progress.save();
      }
    }

    const response: ApiResponse = {
      success: true,
      message: 'Lesson fetched successfully',
      data: {
        lesson,
        progress,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const createLesson = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ success: false, message: 'Invalid data', errors: errors.array() });
      return;
    }

    const course = await Course.findById(req.body.course);
    
    if (!course) {
      res.status(404).json({ success: false, message: 'Course not found' });
      return;
    }

    // Check if user is the instructor of the course
    if (course.instructor.toString() !== req.user._id.toString()) {
      res.status(403).json({ success: false, message: 'Not authorized to add lessons to this course' });
      return;
    }

    const lesson = new Lesson(req.body);
    await lesson.save();

    // Add lesson to course
    course.lessons.push(lesson._id);
    await course.save();

    const response: ApiResponse = {
      success: true,
      message: 'Lesson created successfully',
      data: lesson,
    };

    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateLessonProgress = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { isCompleted, timeSpent } = req.body;
    const lessonId = req.params.id;

    const lesson = await Lesson.findById(lessonId);
    
    if (!lesson) {
      res.status(404).json({ success: false, message: 'Lesson not found' });
      return;
    }

    // Check if user is enrolled in the course
    const isEnrolled = req.user.enrolledCourses.some(
      (course: any) => course.toString() === lesson.course.toString()
    );

    if (!isEnrolled) {
      res.status(403).json({ success: false, message: 'Not enrolled in this course' });
      return;
    }

    let progress = await LessonProgress.findOne({
      student: req.user._id,
      lesson: lessonId,
    });

    if (!progress) {
      progress = new LessonProgress({
        student: req.user._id,
        lesson: lessonId,
      });
    }

    if (isCompleted !== undefined) {
      progress.isCompleted = isCompleted;
      if (isCompleted) {
        progress.completedAt = new Date();
      }
    }

    if (timeSpent !== undefined) {
      progress.timeSpent = timeSpent;
    }

    progress.lastAccessed = new Date();
    await progress.save();

    const response: ApiResponse = {
      success: true,
      message: 'Lesson progress updated successfully',
      data: progress,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};