import mongoose, { Schema } from 'mongoose';
import { IQuizAttempt } from '../types';

const quizAttemptSchema = new Schema<IQuizAttempt>(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    quiz: {
      type: Schema.Types.ObjectId,
      ref: 'Quiz',
      required: true,
    },
    answers: [{
      question: {
        type: Schema.Types.ObjectId,
        required: true,
      },
      answer: {
        type: String,
        required: true,
      },
      isCorrect: {
        type: Boolean,
        required: true,
      },
    }],
    score: {
      type: Number,
      required: true,
      min: 0,
    },
    timeSpent: {
      type: Number,
      required: true,
      min: 0,
    },
    attemptedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const QuizAttempt = mongoose.model<IQuizAttempt>('QuizAttempt', quizAttemptSchema);
export default QuizAttempt;