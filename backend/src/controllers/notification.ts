import { Request, Response } from 'express';
import Notification from '../models/Notification';
import Enrollment from '../models/Enrollment';
import Course from '../models/Course';
import { AuthRequest } from '../middleware/auth';
import { ApiResponse } from '../types';
import { sendEmail } from '../utils/sendEmail';

export const getNotifications = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user._id;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const notifications = await Notification.find({ user: userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Notification.countDocuments({ user: userId });

    const response: ApiResponse = {
      success: true,
      message: 'Notifications fetched successfully',
      data: {
        notifications,
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

export const markAsRead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { notificationIds } = req.body;

    await Notification.updateMany(
      { _id: { $in: notificationIds }, user: req.user._id },
      { isRead: true }
    );

    const response: ApiResponse = {
      success: true,
      message: 'Notifications marked as read',
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const sendNotification = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { courseId, title, message, sendEmail: shouldSendEmail } = req.body;

    // Verify the instructor owns this course
    const course = await Course.findById(courseId);
    if (!course || course.instructor.toString() !== req.user._id.toString()) {
      res.status(403).json({ success: false, message: 'Not authorized to send notifications for this course' });
      return;
    }

    // Get all enrolled students with populated email
    const enrollments = await Enrollment.find({ course: courseId })
      .populate({
        path: 'student',
        select: 'email firstName',
        model: 'Student' // Specify the model to ensure proper typing
      });

    // Create notifications for each student
    const notifications = enrollments.map(enrollment => ({
      user: (enrollment.student as any)._id, // Type assertion to avoid TypeScript errors
      title,
      message,
      type: 'system',
    }));

    await Notification.insertMany(notifications);

    // Send emails if requested
    if (shouldSendEmail) {
      for (const enrollment of enrollments) {
        // Type assertion to access the populated student fields
        const student = enrollment.student as any;
        
        const emailHtml = `
          <h2>${title}</h2>
          <p>${message}</p>
          <p>Course: ${course.title}</p>
          <p>From your instructor</p>
        `;

        try {
          await sendEmail(
            student.email,
            `DirectEd Notification: ${title}`,
            emailHtml
          );
        } catch (emailError) {
          console.error(`Failed to send email to ${student.email}:`, emailError);
        }
      }
    }

    const response: ApiResponse = {
      success: true,
      message: `Notification sent to ${enrollments.length} students`,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};