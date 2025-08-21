import mongoose, { Schema, Document } from 'mongoose';

export interface IEnrollment extends Document {
  student: mongoose.Schema.Types.ObjectId;
  course: mongoose.Schema.Types.ObjectId;
  enrollmentDate: Date;
  status: "active" | "completed" | "dropped";
}

// define the Enrollment schema.
const EnrollmentSchema: Schema = new Schema({
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
  
  enrollmentDate: {
    type: Date,
    default: Date.now,
  },
  
  status: {
    type: String,
    enum: ['active', 'completed', 'dropped'],
    default: 'active',
  },
});

const Enrollment = mongoose.model<IEnrollment>('Enrollment', EnrollmentSchema);
export default Enrollment;