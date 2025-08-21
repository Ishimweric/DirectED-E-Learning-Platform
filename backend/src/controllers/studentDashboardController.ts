import { Request, Response } from 'express';
import Progress from '../models/Progress';
import Course from '../models/Course';
import { Types } from 'mongoose';

export const getStudentDashboardData = async (req: Request, res: Response) => {
  try {
    const studentId = req.user._id;

    // find all progress documents for the current student and populate them.
    const studentProgress = await Progress.find({ student: studentId })
      .populate({
        path: 'course',
        select: 'title description thumbnailUrl instructorId',
        populate: {
          path: 'instructorId',
          select: 'name',
        },
      })
      .populate({
        path: 'lessonProgress.lesson',
        select: 'title',
      });

    // create a simplified dashboard data structure.
    const dashboardData = {
      enrolledCourses: studentProgress.map(progress => {
        const course = progress.course;
        const totalLessons = course.lessons?.length || 1;
        const completedLessons = progress.lessonProgress.filter(lp => lp.completed).length;
        const completionPercentage = Math.floor((completedLessons / totalLessons) * 100);

        return {
          courseId: course._id,
          title: course.title,
          description: course.description,
          instructorName: course.instructorId?.name,
          thumbnailUrl: course.thumbnailUrl,
          completionPercentage,
          totalLessons,
          completedLessons,
        };
      }),
      // This is a simulated list of certificates. In a real app, this would be a separate model.
      certificates: [{
        title: 'Mastering TypeScript',
        completionDate: new Date('2023-01-15'),
        downloadUrl: '/certificates/mastering-typescript-cert.pdf'
      }],
      // The recent activity is derived from the student's progress.
      recentActivity: studentProgress.flatMap(progress =>
        progress.lessonProgress
          .filter(lp => lp.completed)
          .map(lp => ({
            type: 'lesson_completed',
            courseTitle: progress.course.title,
            lessonTitle: lp.lesson?.title,
            date: lp.completedDate,
          }))
      ).sort((a, b) => b.date.getTime() - a.date.getTime()), // Sort by most recent
    };

    res.status(200).json(dashboardData);
  } catch (error) {
    console.error('Error fetching student dashboard:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

/**
 * Enrolls a student in a new course.
 * This is for the POST /api/enrollments API.
 */
export const enrollInCourse = async (req: Request, res: Response) => {
  try {
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
    const newProgress = new Progress({
      student: studentId,
      course: courseId,
      // Initialize lesson progress with all lessons from the course.
      lessonProgress: course.lessons.map((lessonId: Types.ObjectId) => ({
        lesson: lessonId,
        completed: false,
      })),
    });

    await newProgress.save();

    res.status(201).json({ message: 'Enrollment successful.', progress: newProgress });
  } catch (error) {
    console.error('Error enrolling in course:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

/**
 * Gets a student's recent learning activity.
 * This is for the GET /api/student/activity API.
 */
export const getRecentActivity = async (req: Request, res: Response) => {
  try {
    const studentId = req.user._id;

    // Find all progress documents for the student.
    const studentProgress = await Progress.find({ student: studentId })
      .populate({
        path: 'course',
        select: 'title', // Only need the course title
      })
      .populate({
        path: 'lessonProgress.lesson',
        select: 'title', // Only need the lesson title
      })
      .sort('-updatedAt'); // Sort by the most recently updated progress document

    // Filter and map the progress data to create a recent activity feed.
    const activityFeed = studentProgress.flatMap(progress =>
      progress.lessonProgress
        .filter(lp => lp.completed)
        .map(lp => ({
          type: 'lesson_completed',
          courseTitle: progress.course.title,
          lessonTitle: lp.lesson?.title,
          date: lp.completedDate,
        }))
    ).sort((a, b) => b.date.getTime() - a.date.getTime());

    res.status(200).json(activityFeed);
  } catch (error) {
    console.error('Error fetching recent activity:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};