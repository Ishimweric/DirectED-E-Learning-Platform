import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Course, Lesson } from '../types';
import { getCourse, getLesson } from '../services/api';
import { useAuth } from './AuthContext';

interface CourseContextType {
  currentCourse: Course | null;
  currentLesson: Lesson | null;
  loading: boolean;
  error: string | null;
  setCurrentCourse: (course: Course | null) => void;
  setCurrentLesson: (lesson: Lesson | null) => void;
  loadCourse: (courseId: string) => Promise<void>;
  loadLesson: (lessonId: string) => Promise<void>;
  clearCourse: () => void;
  clearLesson: () => void;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

interface CourseProviderProps {
  children: ReactNode;
}

export const CourseProvider: React.FC<CourseProviderProps> = ({ children }) => {
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const loadCourse = async (courseId: string) => {
    if (!user) {
      setError('User must be logged in to access courses');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await getCourse(courseId);
      setCurrentCourse(response.data.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load course');
      console.error('Error loading course:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadLesson = async (lessonId: string) => {
    if (!user) {
      setError('User must be logged in to access lessons');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await getLesson(lessonId);
      setCurrentLesson(response.data.data.lesson);
      
      // If the lesson belongs to a different course than the current one, load that course too
      if (response.data.data.lesson.course && 
          (!currentCourse || currentCourse._id !== response.data.data.lesson.course.toString())) {
        await loadCourse(response.data.data.lesson.course.toString());
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load lesson');
      console.error('Error loading lesson:', err);
    } finally {
      setLoading(false);
    }
  };

  const clearCourse = () => {
    setCurrentCourse(null);
  };

  const clearLesson = () => {
    setCurrentLesson(null);
  };

  // Clear course and lesson data when user logs out
  useEffect(() => {
    if (!user) {
      clearCourse();
      clearLesson();
    }
  }, [user]);

  const value: CourseContextType = {
    currentCourse,
    currentLesson,
    loading,
    error,
    setCurrentCourse,
    setCurrentLesson,
    loadCourse,
    loadLesson,
    clearCourse,
    clearLesson,
  };

  return (
    <CourseContext.Provider value={value}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourse must be used within a CourseProvider');
  }
  return context;
};