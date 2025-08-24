import mongoose, { Schema } from 'mongoose';
import { ICourse } from '../types';

const courseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    instructor: {
      type: Schema.Types.ObjectId,
      ref: 'Instructor',
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    lessons: [{
      type: Schema.Types.ObjectId,
      ref: 'Lesson',
    }],
    quizzes: [{
      type: Schema.Types.ObjectId,
      ref: 'Quiz',
    }],
    studentsEnrolled: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    requirements: {
      type: [String],
      default: [],
    },
    learningOutcomes: {
      type: [String],
      default: [],
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for search functionality
courseSchema.index({
  title: 'text',
  description: 'text',
  category: 'text',
});

const Course = mongoose.model<ICourse>('Course', courseSchema);
export default Course;