import axios from 'axios';
import { Course, Testimonial, ApiResponse, User } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh or redirect to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authApi = {
  login: (email: string, password: string) => 
    api.post<ApiResponse<{ user: User; token: string }>>('/api/auth/login', { email, password }),
  
  register: (userData: any) => 
    api.post<ApiResponse<{ user: User; token: string }>>('/api/auth/register', userData),
  
  getMe: () => 
    api.get<ApiResponse<User>>('/api/auth/me'),
  
  forgotPassword: (email: string) => 
    api.post<ApiResponse>('/api/auth/forgotpassword', { email }),
  
  resetPassword: (token: string, password: string) => 
    api.put<ApiResponse>(`/api/auth/resetpassword/${token}`, { password }),
};

// Public API calls
export const publicApi = {
  getFeaturedCourses: () => 
    api.get<ApiResponse<Course[]>>('/api/courses/featured'),
  
  getTestimonials: () => 
    api.get<ApiResponse<Testimonial[]>>('/api/testimonials'),
  
  getPlatformStats: () => 
    api.get<ApiResponse<any>>('/api/platform/stats'),
  
  getCourses: (params?: any) => 
    api.get<ApiResponse<{ courses: Course[]; pagination: any }>>('/api/courses', { params }),
  
  getCourse: (id: string) => 
    api.get<ApiResponse<Course>>(`/api/courses/${id}`),
};

export const getCourses = () => {
  return api.get('/api/courses');
};

export const getFeaturedCourses = () => {
  return api.get('/api/courses/featured');
};

export const getCourse = (id: string) => {
  return api.get(`/api/courses/${id}`);
};

export const enrollInCourse = (id: string) => {
  return api.post(`/api/courses/${id}/enroll`);
};

export const getCourseProgress = (id: string) => {
  return api.get(`/api/progress/course/${id}`);
};

export const updateLessonProgress = (lessonId: string, data: any) => {
  return api.put(`/api/lessons/${lessonId}/progress`, data);
};

// Add these to your existing API service functions

// Student Progress API
export const getStudentDashboard = () => {
  return api.get('/api/student/dashboard');
};

export const getStudentActivity = (page = 1, limit = 10) => {
  return api.get(`/api/student/activity?page=${page}&limit=${limit}`);
};

// Instructor API
export const getInstructorDashboard = () => {
  return api.get('/api/instructor/dashboard');
};

export const getInstructorCourses = (page = 1, limit = 10) => {
  return api.get(`/api/instructor/courses?page=${page}&limit=${limit}`);
};

export const getCourseStudents = (courseId: string, page = 1, limit = 10) => {
  return api.get(`/api/instructor/students/${courseId}?page=${page}&limit=${limit}`);
};

export const publishCourse = (courseId: string, isPublished: boolean) => {
  return api.post(`/api/instructor/courses/${courseId}/publish`, { isPublished });
};

// Add this function to your existing API service functions
export const getLesson = (lessonId: string) => {
  return api.get(`/api/lessons/${lessonId}`);
};

// src/services/api.ts (add/update these)
export const uploadDocument = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return api.post('/api/upload/document', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const createCourse = (data: any) => {
  return api.post('/api/courses', data);
};

export const createLesson = (data: any) => {
  return api.post('/api/lessons', data);
};

// src/services/api.ts (add/update these)
export const getQuiz = (quizId: string) => {
  return api.get(`/api/quizzes/${quizId}`);
};

export const submitQuiz = (quizId: string, data: { answers: Array<{ question: string; answer: string }>; timeSpent: number }) => {
  return api.post(`/api/quizzes/${quizId}/submit`, data);
};

export const createQuiz = (data: any) => {
  return api.post('/api/quizzes', data); 
};

// src/services/api.ts (add/update this)
export const updateProfile = (data: any) => {
  return api.put('/api/auth/profile', data); // Assuming you add this endpoint in backend
};

export const getProfile = (): Promise<{ data: { data: User } }> => {
  return api.get('/api/auth/me');
};

export const updateUser = (data: Partial<User>): Promise<{ data: { data: User } }> => {
  return api.put('/api/auth/profile', data);
};

export const getCertificate = (verificationCode: string) => {
  return api.get(`/api/certificates/${verificationCode}`);
};

export const generateCertificate = (courseId: string) => {
  return api.post(`/api/certificates/${courseId}/generate`);
};

// In src/services/api.ts
export const sendMessage = (data: {
  message: string;
  courseId?: string;
  lessonId?: string;
}) => {
  return api.post('/api/chat/message', data);
};

export const getChatHistory = (page = 1, limit = 20) => {
  return api.get(`/api/chat/history?page=${page}&limit=${limit}`);
};

// In src/services/api.ts
export const searchCourses = (queryParams: string) => {
  return api.get(`/api/courses?${queryParams}`);
};

// We'll add more API calls as we implement other features
export default api;