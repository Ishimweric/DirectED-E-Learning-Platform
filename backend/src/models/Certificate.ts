import mongoose, { Schema } from 'mongoose';
import { ICertificate } from '../types';

const certificateSchema = new Schema<ICertificate>(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    issuedAt: {
      type: Date,
      default: Date.now,
    },
    certificateUrl: {
      type: String,
      required: true,
    },
    verificationCode: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure one certificate per student per course
certificateSchema.index({ student: 1, course: 1 }, { unique: true });

const Certificate = mongoose.model<ICertificate>('Certificate', certificateSchema);
export default Certificate;