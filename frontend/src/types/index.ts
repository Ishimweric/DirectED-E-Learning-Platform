export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'Student' | 'Instructor';
  avatar?: string;
  bio?: string;
  skills?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Student extends User {
  enrolledCourses: string[];
  completedCourses: string[];
  certificates: string[];
}

export interface Instructor extends User {
  courses: string[];
  totalStudents: number;
  rating: number;
}

export interface Course {
  _id: string;
  title: string;
  description: string;
  instructor: Instructor | string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  thumbnail: string;
  lessons: string[];
  quizzes: string[];
  studentsEnrolled: number;
  rating: number;
  requirements: string[];
  learningOutcomes: string[];
  isPublished: boolean;
  duration?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Lesson {
  _id: string;
  course: string;
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
  createdAt: string;
  updatedAt: string;
}

export interface Testimonial {
  _id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'instructor';
}