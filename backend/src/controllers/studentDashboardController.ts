import { Request, Response } from 'express';
import Progress from '../models/Progress';
import Course from '../models/Course';
import { Types } from 'mongoose';

export const getStudentDashboardData = async (req: Request, res: Response) => {
  try {
    // ---- ADD THIS GUARD CLAUSE ----
    // Check if the user is authenticated and the user object exists on the request.
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    // Now that we've checked, TypeScript knows req.user is not undefined.
    const studentId = req.user._id;

    // Find all progress documents for the current student and populate them.
    const studentProgress = await Progress.find({ student: studentId })
      .populate({
        path: 'course',
        // Only get the necessary fields from the course document.
        select: 'title description thumbnail url instructorId lessons'
      })
      .populate({
        path: 'course.instructorId',
        select: 'name',
      })
      .populate({
        path: 'lessonProgress.lesson',
        select: 'title',
      });

    // Create a simplified dashboard data structure.
    const dashboardData = studentProgress.map((progress) => {
      const course = progress.course as any; // Temporary cast for better intellisense
      const totalLessons = course.lessons?.length || 0;
      const completedLessons = progress.lessonProgress.filter((lp) => lp.completed).length;

      return {
        course,
        totalLessons,
        completedLessons,
        completionPercentage: totalLessons > 0 ? Math.floor((completedLessons / totalLessons) * 100) : 0,
      };
    });

    res.status(200).json(dashboardData);

  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


/**
 * Enrolls a student in a new course.
 * This is for the POST /api/enrollments API.
 */
export const enrollInCourse = async (req: Request, res: Response) => {
  try {
    // FIX: Add a check to ensure req.user exists before using it.
    // This handles the 'req.user is possibly undefined' error and improves security.
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated.' });
    }
    
    const { courseId } = req.body;
    const studentId = req.user._id;

    // Validate if the course exists.
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found.' });
    }

    // Check if the student is already enrolled.
    const existingEnrollment = await Progress.findOne({ student: studentId, course: courseId });
    if (existingEnrollment) {
      return res.status(409).json({ message: 'Student is already enrolled in this course.' });
    }

    // Create a new Progress document for the student.
    const lessonProgress = course.lessons.map((lessonId) => ({
      // FIX: Add .toString() here to convert the ObjectId to a string.
      lesson: lessonId.toString(),
      completed: false,
    }));

    const newProgress = new Progress({
      student: studentId,
      course: courseId,
      lessonProgress,
    });

    await newProgress.save();

    res.status(201).json({ message: 'Enrollment successful!', progress: newProgress });

  } catch (error) {
    console.error('Error during enrollment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getRecentActivity = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const studentId = req.user._id;

    // Find all progress documents for the student.
    const studentProgress = await Progress.find({ student: studentId })
      .populate({
        path: 'course',
        // Only get the course title.
        select: 'title',
      })
      .populate({
        path: 'lessonProgress.lesson',
        // Only get the lesson title.
        select: 'title',
      })
      .sort('-updatedAt'); // Sort by the most recently updated progress document

    // Filter and map the progress data to create a recent activity feed.
    const activityFeed = studentProgress.flatMap(progress =>
      progress.lessonProgress
        .filter(lp => lp.completed)
        .map(lp => ({
          type: 'lesson_completed',
          courseTitle: (progress.course as any)?.title,
          lessonTitle: (lp.lesson as any)?.title,
          // Correct the type definition for the date
          date: lp.completedDate,
        }))
    );

    activityFeed.sort((a, b) => (b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0));

    res.status(200).json(activityFeed);

  } catch (error) {
    console.error('Error fetching recent activity:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};