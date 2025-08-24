import mongoose, { Schema } from 'mongoose';
import { IQuiz, IQuestion } from '../types';

const questionSchema = new Schema<IQuestion>({
  question: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['multiple-choice', 'true-false', 'short-answer'],
    required: true,
  },
  options: [{
    type: String,
  }],
  correctAnswer: {
    type: String,
    required: true,
  },
  explanation: {
    type: String,
    default: '',
  },
  points: {
    type: Number,
    required: true,
    min: 1,
  },
});

const quizSchema = new Schema<IQuiz>(
  {
    lesson: {
      type: Schema.Types.ObjectId,
      ref: 'Lesson',
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    questions: [questionSchema],
    timeLimit: {
      type: Number,
      required: true,
      min: 0, // 0 means no time limit
    },
    passingScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    maxAttempts: {
      type: Number,
      default: 1,
      min: 1,
    },
  },
  {
    timestamps: true,
  }
);

const Quiz = mongoose.model<IQuiz>('Quiz', quizSchema);
export default Quiz;