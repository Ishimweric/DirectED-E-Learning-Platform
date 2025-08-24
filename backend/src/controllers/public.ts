import { Request, Response } from 'express';
import Testimonial from '../models/Testimonial';
import Course from '../models/Course';
import { User, Student, Instructor } from '../models/User';
import Enrollment from '../models/Enrollment';
import { ApiResponse } from '../types';

export const getTestimonials = async (req: Request, res: Response): Promise<void> => {
  try {
    const testimonials = await Testimonial.find({ isActive: true })
      .sort({ createdAt: -1 })
      .limit(10);

    const response: ApiResponse = {
      success: true,
      message: 'Testimonials fetched successfully',
      data: testimonials,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getPlatformStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const totalCourses = await Course.countDocuments({ isPublished: true });
    const totalStudents = await Student.countDocuments();
    const totalInstructors = await Instructor.countDocuments();
    const totalEnrollments = await Enrollment.countDocuments();

    const response: ApiResponse = {
      success: true,
      message: 'Platform stats fetched successfully',
      data: {
        totalCourses,
        totalStudents,
        totalInstructors,
        totalEnrollments,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};