import { Request, Response } from 'express';
import Enrollment from '../models/Enrollment';
import LessonProgress from '../models/LessonProgress';
import QuizAttempt from '../models/QuizAttempt';
import Certificate from '../models/Certificate';
import Course from '../models/Course';
import Notification from '../models/Notification';
import { AuthRequest } from '../middleware/auth';
import { ApiResponse } from '../types';

export const getStudentDashboard = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const studentId = req.user._id;

    // Get enrolled courses with progress
    const enrollments = await Enrollment.find({ student: studentId })
      .populate({
        path: 'course',
        populate: {
          path: 'instructor',
          select: 'firstName lastName',
        },
      })
      .sort({ lastAccessed: -1 });

    // Calculate overall progress and get recent activity
    const enrolledCourses = enrollments.map(enrollment => {
      // Type assertion to handle populated course
      const course = enrollment.course as any;
      return {
        ...course.toObject(),
        progress: enrollment.progress,
        lastAccessed: enrollment.lastAccessed,
      };
    });

    // Get recent activity (lesson completions and quiz attempts)
    const recentLessons = await LessonProgress.find({ student: studentId, isCompleted: true })
      .populate({
        path: 'lesson',
        select: 'title course',
        populate: {
          path: 'course',
          select: 'title',
        },
      })
      .sort({ completedAt: -1 })
      .limit(5);

    const recentQuizzes = await QuizAttempt.find({ student: studentId })
      .populate({
        path: 'quiz',
        select: 'title',
      })
      .sort({ attemptedAt: -1 })
      .limit(5);

    // Get certificates
    const certificates = await Certificate.find({ student: studentId })
      .populate('course', 'title');

    // Format recent activity
    const recentActivity = [
      ...recentLessons.map(progress => {
        // Type assertion to handle populated lesson
        const lesson = progress.lesson as any;
        return {
          type: 'lesson',
          title: lesson.title,
          course: lesson.course?.title || 'Unknown Course',
          date: progress.completedAt || new Date(), // Provide fallback date
          message: `Completed lesson: ${lesson.title}`,
        };
      }),
      ...recentQuizzes.map(attempt => {
        // Type assertion to handle populated quiz
        const quiz = attempt.quiz as any;
        return {
          type: 'quiz',
          title: quiz.title,
          date: attempt.attemptedAt,
          message: `Scored ${attempt.score}% on ${quiz.title}`,
        };
      }),
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
     .slice(0, 10);

    const response: ApiResponse = {
      success: true,
      message: 'Student dashboard data fetched successfully',
      data: {
        enrolledCourses,
        recentActivity,
        certificates,
        stats: {
          totalCourses: enrollments.length,
          completedCourses: enrollments.filter(e => e.progress === 100).length,
          totalLessons: await LessonProgress.countDocuments({ student: studentId }),
          completedLessons: await LessonProgress.countDocuments({ 
            student: studentId, 
            isCompleted: true 
          }),
        },
      },
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getStudentActivity = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const studentId = req.user._id;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    // Get lesson completions
    const lessonCompletions = await LessonProgress.find({ 
      student: studentId, 
      isCompleted: true 
    })
      .populate({
        path: 'lesson',
        select: 'title course',
        populate: {
          path: 'course',
          select: 'title',
        },
      })
      .sort({ completedAt: -1 })
      .skip(skip)
      .limit(limit);

    // Get quiz attempts
    const quizAttempts = await QuizAttempt.find({ student: studentId })
      .populate({
        path: 'quiz',
        select: 'title',
      })
      .sort({ attemptedAt: -1 })
      .skip(skip)
      .limit(limit);

    // Combine and format activities
    const activities = [
      ...lessonCompletions.map(progress => {
        // Type assertion to handle populated lesson
        const lesson = progress.lesson as any;
        return {
          type: 'lesson',
          title: lesson?.title || 'Unknown Lesson',
          course: lesson?.course?.title || 'Unknown Course',
          date: progress.completedAt || new Date(),
          message: `Completed lesson: ${lesson?.title || 'Unknown Lesson'}`,
        };
      }),
      ...quizAttempts.map(attempt => {
        // Type assertion to handle populated quiz
        const quiz = attempt.quiz as any;
        return {
          type: 'quiz',
          title: quiz?.title || 'Unknown Quiz',
          date: attempt.attemptedAt,
          message: `Scored ${attempt.score}% on ${quiz?.title || 'Unknown Quiz'}`,
        };
      }),
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const totalLessonCompletions = await LessonProgress.countDocuments({ 
      student: studentId, 
      isCompleted: true 
    });
    
    const totalQuizAttempts = await QuizAttempt.countDocuments({ student: studentId });
    const total = totalLessonCompletions + totalQuizAttempts;

    const response: ApiResponse = {
      success: true,
      message: 'Student activity fetched successfully',
      data: {
        activities,
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