import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser, IStudent, IInstructor } from '../types';

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ['student', 'instructor'],
      required: true,
    },
    avatar: {
      type: String,
      default: '',
    },
    bio: {
      type: String,
      default: '',
    },
    skills: {
      type: [String],
      default: [],
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
    discriminatorKey: 'role',
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Student schema
const studentSchema = new Schema<IStudent>({
  enrolledCourses: [{
    type: Schema.Types.ObjectId,
    ref: 'Course',
  }],
  completedCourses: [{
    type: Schema.Types.ObjectId,
    ref: 'Course',
  }],
  certificates: [{
    type: Schema.Types.ObjectId,
    ref: 'Certificate',
  }],
});

// Instructor schema
const instructorSchema = new Schema<IInstructor>({
  courses: [{
    type: Schema.Types.ObjectId,
    ref: 'Course',
  }],
  totalStudents: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
});

const User = mongoose.model<IUser>('User', userSchema);
const Student = User.discriminator<IStudent>('Student', studentSchema);
const Instructor = User.discriminator<IInstructor>('Instructor', instructorSchema);

export { User, Student, Instructor };