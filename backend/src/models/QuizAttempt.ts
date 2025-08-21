import mongoose, { Schema, Document } from 'mongoose';

export interface IQuizAttempt extends Document {
  quiz: mongoose.Schema.Types.ObjectId;
  student: mongoose.Schema.Types.ObjectId;
  score: number;
  answers: {
    questionId: mongoose.Schema.Types.ObjectId;
    submittedAnswer: string | string[];
    isCorrect: boolean;
  }[];
  attemptDate: Date;
}

const QuizAttemptSchema: Schema = new Schema({
  
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true,
  },
  
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  score: {
    type: Number,
    required: true,
  },
  
  answers: [{
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    submittedAnswer: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    isCorrect: {
      type: Boolean,
      required: true,
    },
  }],
  
  attemptDate: {
    type: Date,
    default: Date.now,
  },
});

const QuizAttempt = mongoose.model<IQuizAttempt>('QuizAttempt', QuizAttemptSchema);
export default QuizAttempt;
