import { Request, Response } from 'express';
import Enrollment from '../models/Enrollment';
import LessonProgress from '../models/LessonProgress';
import Lesson from '../models/Lesson';
import { AuthRequest } from '../middleware/auth';
import { ApiResponse } from '../types';

export const getCourseProgress = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { courseId } = req.params;
    const studentId = req.user._id;

    // Get enrollment to check progress
    const enrollment = await Enrollment.findOne({
      student: studentId,
      course: courseId,
    });

    if (!enrollment) {
      res.status(404).json({ success: false, message: 'Not enrolled in this course' });
      return;
    }

    // Get all lessons for the course
    const lessons = await Lesson.find({ course: courseId }).sort({ order: 1 });

    // Get progress for each lesson
    const lessonsWithProgress = await Promise.all(
      lessons.map(async (lesson) => {
        const progress = await LessonProgress.findOne({
          student: studentId,
          lesson: lesson._id,
        });
        
        return {
          _id: lesson._id,
          title: lesson.title,
          description: lesson.description,
          duration: lesson.duration,
          order: lesson.order,
          isPreview: lesson.isPreview,
          progress: progress || { isCompleted: false, timeSpent: 0 },
        };
      })
    );

    const response: ApiResponse = {
      success: true,
      message: 'Course progress fetched successfully',
      data: {
        overallProgress: enrollment.progress,
        lessons: lessonsWithProgress,
        enrolledAt: enrollment.enrolledAt,
        lastAccessed: enrollment.lastAccessed,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};