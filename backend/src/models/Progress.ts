import mongoose, { Schema, Document, Types } from 'mongoose';

// Define the interface for the sub-document
interface IProgressLesson extends Document {
  lesson: Types.ObjectId;
  completed: boolean;
  // Add the completedDate field to the schema
  completedDate?: Date; 
}

// Define the main document interface
export interface IProgress extends Document {
  student: Types.ObjectId;
  course: Types.ObjectId;
  lessonProgress: IProgressLesson[];
  updatedAt: Date;
}

// Define the schema for the sub-document
const ProgressLessonSchema: Schema = new Schema({
  lesson: { type: Schema.Types.ObjectId, ref: 'Lesson', required: true },
  completed: { type: Boolean, required: true, default: false },
  // Add the schema field for completedDate
  completedDate: { type: Date }
});

// Define the main schema with a reference to the sub-schema
const ProgressSchema: Schema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  lessonProgress: [ProgressLessonSchema],
}, { timestamps: true }); // Ensure timestamps are enabled to get updatedAt

const Progress = mongoose.model<IProgress>('Progress', ProgressSchema);

export default Progress;
