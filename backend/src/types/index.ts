import { Document, Types } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'Student' | 'Instructor';
  avatar?: string;
  bio?: string;
  skills?: string[];
  createdAt: Date;
  updatedAt: Date;
  resetPasswordToken: String | undefined,
  resetPasswordExpire: Date | undefined,
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

export interface IStudent extends IUser {
  enrolledCourses: Types.ObjectId[];
  completedCourses: Types.ObjectId[];
  certificates: Types.ObjectId[];
}

export interface IInstructor extends IUser {
  courses: Types.ObjectId[];
  totalStudents: number;
  rating: number;
}

export interface ICourse extends Document {
  _id: Types.ObjectId;
  title: string;
  description: string;
  instructor: Types.ObjectId;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  thumbnail: string;
  lessons: Types.ObjectId[];
  quizzes: Types.ObjectId[];
  studentsEnrolled: number;
  rating: number;
  requirements: string[];
  learningOutcomes: string[];
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILesson extends Document {
  _id: Types.ObjectId;
  course: Types.ObjectId;
  title: string;
  description: string;
  videoUrl: string;
  duration: number;
  order: number;
  attachments: {
    name: string;
    url: string;
  }[];
  isPreview: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IQuiz extends Document {
  _id: Types.ObjectId;
  lesson: Types.ObjectId;
  course: Types.ObjectId;
  title: string;
  description: string;
  questions: IQuestion[];
  timeLimit: number;
  passingScore: number;
  maxAttempts: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IQuestion {
  _id: Types.ObjectId;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  options: string[];
  correctAnswer: string;
  explanation: string;
  points: number;
}

export interface IEnrollment extends Document {
  _id: Types.ObjectId;
  student: Types.ObjectId;
  course: Types.ObjectId;
  enrolledAt: Date;
  completedAt?: Date;
  progress: number;
  lastAccessed: Date;
}

export interface ILessonProgress extends Document {
  _id: Types.ObjectId;
  student: Types.ObjectId;
  lesson: Types.ObjectId;
  isCompleted: boolean;
  completedAt?: Date;
  timeSpent: number;
  lastAccessed: Date;
}

export interface IQuizAttempt extends Document {
  _id: Types.ObjectId;
  student: Types.ObjectId;
  quiz: Types.ObjectId;
  answers: {
    question: Types.ObjectId;
    answer: string;
    isCorrect: boolean;
  }[];
  score: number;
  timeSpent: number;
  attemptedAt: Date;
}

export interface ICertificate extends Document {
  _id: Types.ObjectId;
  student: Types.ObjectId;
  course: Types.ObjectId;
  issuedAt: Date;
  certificateUrl: string;
  verificationCode: string;
}

export interface INotification extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  title: string;
  message: string;
  type: 'enrollment' | 'progress' | 'achievement' | 'system';
  isRead: boolean;
  createdAt: Date;
}

export interface IChatSession extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  context?: {
    course?: Types.ObjectId;
    lesson?: Types.ObjectId;
  };
  messages: IChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IChatMessage {
  _id?: Types.ObjectId;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}