import { Request, Response } from 'express';
import Course from '../models/Course';
import Enrollment from '../models/Enrollment';
import LessonProgress from '../models/LessonProgress';
import QuizAttempt from '../models/QuizAttempt';
import { AuthRequest } from '../middleware/auth';
import { ApiResponse } from '../types';

export const getInstructorDashboard = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const instructorId = req.user._id;

    // Get instructor's courses with enrollment stats
    const courses = await Course.find({ instructor: instructorId })
      .populate({
        path: 'lessons',
        select: 'title duration',
      })
      .populate({
        path: 'quizzes',
        select: 'title',
      });

    // Get enrollment stats for each course
    const coursesWithStats = await Promise.all(
      courses.map(async (course) => {
        const enrollments = await Enrollment.find({ course: course._id });
        const totalStudents = enrollments.length;
        const completedStudents = enrollments.filter(e => e.progress === 100).length;
        
        // Calculate average progress
        const avgProgress = enrollments.reduce((sum, e) => sum + e.progress, 0) / 
                           (totalStudents || 1);
        
        // Get recent enrollments (last 7 days)
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        const recentEnrollments = enrollments.filter(
          e => e.enrolledAt >= weekAgo
        ).length;

        return {
          ...course.toObject(),
          totalStudents,
          completedStudents,
          avgProgress: Math.round(avgProgress),
          recentEnrollments,
        };
      })
    );

    // Calculate overall stats
    const totalCourses = courses.length;
    const totalStudents = await Enrollment.countDocuments({
      course: { $in: courses.map(c => c._id) },
    });
    const totalRevenue = courses.reduce((sum, course) => {
      return sum + (course.price * course.studentsEnrolled);
    }, 0);

    const response: ApiResponse = {
      success: true,
      message: 'Instructor dashboard data fetched successfully',
      data: {
        courses: coursesWithStats,
        stats: {
          totalCourses,
          totalStudents,
          totalRevenue,
          avgCourseRating: courses.reduce((sum, course) => sum + course.rating, 0) / 
                          (totalCourses || 1),
        },
      },
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getInstructorCourses = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const instructorId = req.user._id;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const courses = await Course.find({ instructor: instructorId })
      .populate({
        path: 'lessons',
        select: 'title duration',
      })
      .populate({
        path: 'quizzes',
        select: 'title',
      })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Course.countDocuments({ instructor: instructorId });

    const response: ApiResponse = {
      success: true,
      message: 'Instructor courses fetched successfully',
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

export const getCourseStudents = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const courseId = req.params.courseId;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    // Verify the instructor owns this course
    const course = await Course.findById(courseId);
    if (!course || course.instructor.toString() !== req.user._id.toString()) {
      res.status(403).json({ success: false, message: 'Not authorized to view this course' });
      return;
    }

    const enrollments = await Enrollment.find({ course: courseId })
      .populate('student', 'firstName lastName email avatar')
      .skip(skip)
      .limit(limit)
      .sort({ enrolledAt: -1 });

    // Get detailed progress for each student
    const studentsWithProgress = await Promise.all(
      enrollments.map(async (enrollment) => {
        const student = enrollment.student;
        const lessonProgress = await LessonProgress.find({
          student: student._id,
          lesson: { $in: course.lessons },
        });

        const completedLessons = lessonProgress.filter(lp => lp.isCompleted).length;
        const totalLessons = course.lessons.length;
        const quizAttempts = await QuizAttempt.find({
          student: student._id,
          quiz: { $in: course.quizzes },
        });

        return {
          student,
          enrollmentDate: enrollment.enrolledAt,
          progress: enrollment.progress,
          completedLessons,
          totalLessons,
          quizAttempts: quizAttempts.length,
          lastAccessed: enrollment.lastAccessed,
        };
      })
    );

    const total = await Enrollment.countDocuments({ course: courseId });

    const response: ApiResponse = {
      success: true,
      message: 'Course students fetched successfully',
      data: {
        students: studentsWithProgress,
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

export const publishCourse = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const courseId = req.params.courseId;
    const { isPublished } = req.body;

    const course = await Course.findById(courseId);
    
    if (!course) {
      res.status(404).json({ success: false, message: 'Course not found' });
      return;
    }

    // Check if user is the instructor of the course
    if (course.instructor.toString() !== req.user._id.toString()) {
      res.status(403).json({ success: false, message: 'Not authorized to update this course' });
      return;
    }

    course.isPublished = isPublished;
    await course.save();

    const response: ApiResponse = {
      success: true,
      message: `Course ${isPublished ? 'published' : 'unpublished'} successfully`,
      data: course,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};