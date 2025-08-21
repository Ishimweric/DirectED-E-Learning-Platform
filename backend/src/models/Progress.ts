import mongoose, { Schema, Document } from 'mongoose';

interface LessonProgress {
  lesson: mongoose.Schema.Types.ObjectId;
  completed: boolean;
  completionDate?: Date;
}

export interface IProgress extends Document {
  student: mongoose.Schema.Types.ObjectId;
  course: mongoose.Schema.Types.ObjectId;
  lessonProgress: LessonProgress[];
  completionPercentage: number;
  lastUpdated: Date;
}

const ProgressSchema: Schema = new Schema({

  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  
  lessonProgress: [{
    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson',
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    completionDate: {
      type: Date,
    },
  }],
  
  completionPercentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

const Progress = mongoose.model<IProgress>('Progress', ProgressSchema);
export default Progress;