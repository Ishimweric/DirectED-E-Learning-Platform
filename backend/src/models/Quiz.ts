import mongoose, { Schema, Document } from 'mongoose';

interface IQuestion {
  questionText: string;
  options: string[];
  correctAnswer: string;
}

export interface IQuiz extends Document {
  lesson: mongoose.Schema.Types.ObjectId;
  questions: IQuestion[];
  createdAt: Date;
  updatedAt: Date;
}

const QuestionSchema: Schema = new Schema({
  questionText: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
});

const QuizSchema: Schema = new Schema({
  
  lesson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
    required: true,
    unique: true,
  },
  
  questions: {
    type: [QuestionSchema],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

QuizSchema.pre<IQuiz>('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Quiz = mongoose.model<IQuiz>('Quiz', QuizSchema);
export default Quiz;