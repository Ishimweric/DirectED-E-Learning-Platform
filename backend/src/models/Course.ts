import mongoose, { Schema, Document } from 'mongoose';

// Define the shape of a lesson for this placeholder model.
// This is important because your controllers reference lessons.
interface IPlaceholderLesson {
  _id: mongoose.Types.ObjectId;
  title: string;
}

// Define the Mongoose document interface for the Course model.
// This allows for type-safe interaction with the Course documents.
export interface IPlaceholderCourse extends Document {
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  // This array holds ObjectIds for lessons, which is what your controllers expect.
  lessons: mongoose.Types.ObjectId[];
  instructor: mongoose.Types.ObjectId;
}

// Define the Course schema.
const CourseSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true },
  url: { type: String, required: true },
  // 'lessons' is an array of Mongoose ObjectIds.
  lessons: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }],
  instructor: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

// Export the Mongoose model. The 'Course' string here must match the
// model name used in your controllers (e.g., `Course.findById`).
const Course = mongoose.model<IPlaceholderCourse>('Course', CourseSchema);

export default Course;
