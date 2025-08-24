import { Request, Response } from 'express';
import Certificate from '../models/Certificate';
import Enrollment from '../models/Enrollment';
import Course from '../models/Course';
import { AuthRequest } from '../middleware/auth';
import { ApiResponse } from '../types';
import { generateVerificationCode } from '../utils/generateCode';

export const generateCertificate = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { courseId } = req.params;
    const studentId = req.user._id;

    // Check if enrollment exists and course is completed
    const enrollment = await Enrollment.findOne({
      student: studentId,
      course: courseId
    });

    if (!enrollment || enrollment.progress < 100) {
      res.status(400).json({
        success: false,
        message: 'Course not completed yet'
      });
      return;
    }

    // Check if certificate already exists
    const existingCertificate = await Certificate.findOne({
      student: studentId,
      course: courseId
    });

    if (existingCertificate) {
      const response: ApiResponse = {
        success: true,
        message: 'Certificate already exists',
        data: existingCertificate
      };
      res.status(200).json(response);
      return;
    }

    // Get course details
    const course = await Course.findById(courseId);
    if (!course) {
      res.status(404).json({
        success: false,
        message: 'Course not found'
      });
      return;
    }

    // Generate certificate
    const verificationCode = generateVerificationCode();
    const certificateUrl = `${process.env.CLIENT_URL}/certificate/${verificationCode}`;

    const certificate = new Certificate({
      student: studentId,
      course: courseId,
      certificateUrl,
      verificationCode
    });

    await certificate.save();

    // Add certificate to student's certificates array
    req.user.certificates.push(certificate._id);
    await req.user.save();

    const response: ApiResponse = {
      success: true,
      message: 'Certificate generated successfully',
      data: certificate
    };

    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error while generating certificate'
    });
  }
};

export const getCertificate = async (req: Request, res: Response): Promise<void> => {
  try {
    const { verificationCode } = req.params;

    const certificate = await Certificate.findOne({ verificationCode })
      .populate('student', 'firstName lastName')
      .populate('course', 'title');

    if (!certificate) {
      res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
      return;
    }

    const response: ApiResponse = {
      success: true,
      message: 'Certificate fetched successfully',
      data: certificate
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching certificate'
    });
  }
};