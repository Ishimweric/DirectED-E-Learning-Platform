import { Request, Response } from 'express';
import User from '../models/User';
import Enrollment from '../models/Enrollment';
import Certificate from '../models/Certificate';
import Progress from '../models/Progress';
import Lesson from '../models/Lesson';
import Course from '../models/Course';
import QuizAttempt from "../models/Quiz";

interface CourseProgress {
    courseId: string;
    courseTitle: string;
    progressPercentage: number;
    lessonsCompleted: number;
    totalLessons: number;
}

interface ActivityItem {
  type: string;
  details: string;
  timestamp: Date;
}

// get comprehensive dashboard data for a student
export const getDashboardData = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id; // Get user ID from the authenticated request

        // Fetch user data
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Fetch enrolled courses and their progress
        const enrollments = await Enrollment.find({ student: userId }).populate('course');
        const progressSummaries: CourseProgress[] = [];

        for (const enrollment of enrollments) {
            const course = enrollment.course as any; // Type assertion for populated document
            if (course) {
                const totalLessons = course.lessons.length;
                const progressDoc = await Progress.findOne({ user: userId, course: course._id });
                const lessonsCompleted = progressDoc ? progressDoc.completedLessons.length : 0;
                const progressPercentage = totalLessons > 0 ? (lessonsCompleted / totalLessons) * 100 : 0;

                progressSummaries.push({
                    courseId: course._id,
                    courseTitle: course.title,
                    progressPercentage,
                    lessonsCompleted,
                    totalLessons,
                });
            }
        }

        // Fetch certificates
        const certificates = await Certificate.find({ student: userId }).populate('course');

        // Fetch recent activity (moving this logic here from a separate controller)
        const activityTimeline = await getActivityTimelineLogic(userId);

        res.status(200).json({
            user,
            enrolledCourses: progressSummaries,
            certificates,
            recentActivity: activityTimeline,
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const getActivityTimelineLogic = async (userId: string): Promise<ActivityItem[]> => {
  const activityTimeline: ActivityItem[] = [];

  // 1. fetch recent lesson completions from the user's progress
  const progressDocs = await Progress.find({ user: userId }).populate({
    path: "completedLessons",
    select: "title",
    model: Lesson,
  });

  progressDocs.forEach(doc => {
    doc.completedLessons.forEach(lesson => {
      activityTimeline.push({
        type: 'Lesson Completed',
        details: `Finished lesson: "${(lesson as any).title}"`,
        timestamp: doc.updatedAt,
      });
    });
  });

  // 3. Fetch recent quiz attempts.
  const quizAttempts = await QuizAttempt.find({ user: userId }).populate({
    path: 'quiz',
    select: 'title',
  });

  quizAttempts.forEach(attempt => {
    activityTimeline.push({
      type: 'Quiz Attempted',
      details: `Attempted quiz for: "${(attempt.quiz as any).title}"`,
      timestamp: attempt.createdAt,
    });
  });

  // 3. sort the activity timeline by timestamp in descending order.
  activityTimeline.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  return activityTimeline;
};

//API for recent activity
export const getActivityTimeline = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const activityTimeline = await getActivityTimelineLogic(userId);
    res.status(200).json(activityTimeline);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch activity!", error });
  }
};