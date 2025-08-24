import mongoose, { Schema } from 'mongoose';
import { ILessonProgress } from '../types';

const lessonProgressSchema = new Schema<ILessonProgress>(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    lesson: {
      type: Schema.Types.ObjectId,
      ref: 'Lesson',
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Date,
    },
    timeSpent: {
      type: Number,
      default: 0,
      min: 0,
    },
    lastAccessed: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure one progress record per student per lesson
lessonProgressSchema.index({ student: 1, lesson: 1 }, { unique: true });

const LessonProgress = mongoose.model<ILessonProgress>('LessonProgress', lessonProgressSchema);
export default LessonProgress;