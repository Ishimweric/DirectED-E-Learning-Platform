import React, { createContext, useReducer, useContext,useCallback } from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';
import type { DashboardState, DashboardAction, CourseData, DashboardSummary } from '../types/studentDashboard';

// Initial state for the reducer
const initialState: DashboardState = {
  completedCourses: [],
  inProgressCourses: [],
  notStartedCourses: [],
  summary: { completed: 0, inProgress: 0, toStart: 0 },
  isLoading: true,
  error: null,
};

// The reducer function to handle state transitions
const dashboardReducer = (state: DashboardState, action: DashboardAction): DashboardState => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, isLoading: true, error: null };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        completedCourses: action.payload.completedCourses,
        inProgressCourses: action.payload.inProgressCourses,
        notStartedCourses: action.payload.notStartedCourses,
        summary: action.payload.summary,
      };
    case 'FETCH_ERROR':
      return { ...state, isLoading: false, error: action.payload.error };
    default:
      return state;
  }
};

// Define the shape of our context
interface DashboardContextProps {
  state: DashboardState;
  dispatch: React.Dispatch<DashboardAction>;
  fetchDashboardData: (token: string) => Promise<void>;
}

// Create the context
const DashboardContext = createContext<DashboardContextProps | undefined>(undefined);

// Mock data to be used as a placeholder until the real API is ready
const MOCK_DASHBOARD_DATA = {
  completedCourses: [
    {
      _id: '1',
      course: {
        title: 'Introduction to Web Development',
        description: 'Learn the basics of HTML, CSS, and JavaScript.',
        thumbnail: 'https://placehold.co/48x48',
        url: '#',
        lessons: []
      },
      totalLessons: 10,
      completedLessons: 10,
      completionPercentage: 100,
    },
    {
      _id: '2',
      course: {
        title: 'Advanced JavaScript',
        description: 'Dive deep into modern JS concepts.',
        thumbnail: 'https://placehold.co/48x48',
        url: '#',
        lessons: []
      },
      totalLessons: 15,
      completedLessons: 15,
      completionPercentage: 100,
    },
  ],
  inProgressCourses: [
    {
      _id: '3',
      course: {
        title: 'React Fundamentals',
        description: 'Master the core concepts of React.',
        thumbnail: 'https://placehold.co/48x48',
        url: '#',
        lessons: []
      },
      totalLessons: 20,
      completedLessons: 12,
      completionPercentage: 60,
    },
    {
      _id: '4',
      course: {
        title: 'Node.js for Beginners',
        description: 'Build your first backend server.',
        thumbnail: 'https://placehold.co/48x48',
        url: '#',
        lessons: []
      },
      totalLessons: 18,
      completedLessons: 5,
      completionPercentage: 28,
    },
  ],
  notStartedCourses: [
    {
      _id: '5',
      course: {
        title: 'Database Management',
        description: 'Learn SQL and NoSQL databases.',
        thumbnail: 'https://placehold.co/48x48',
        url: '#',
        lessons: []
      },
      totalLessons: 12,
      completedLessons: 0,
      completionPercentage: 0,
    },
  ],
  summary: {
    completed: 2,
    inProgress: 2,
    toStart: 1,
  },
};

// Define the provider component
export const DashboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  // Memoize the fetch function to prevent re-creation on every render
  const fetchDashboardData = useCallback(async (token: string) => {
    dispatch({ type: 'FETCH_START' });
    try {
      // Placeholder: Simulating an Axios API call with a delay
      // Replace with an actual axios.get call when the endpoint is ready
      // const response = await axios.get("http://localhost:5000/api/student/dashboard", {
      //   headers: { Authorization: `Bearer ${token}` }
      // });
      // dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
      
      // Using a promise to simulate an async request with mock data
      await new Promise(resolve => setTimeout(resolve, 1500));
      dispatch({ type: 'FETCH_SUCCESS', payload: MOCK_DASHBOARD_DATA });

    } catch (err: any) {
      // Error handling for both real and mock API calls
      const errorMessage = axios.isAxiosError(err) ? err.message : 'An unknown error occurred.';
      dispatch({ type: 'FETCH_ERROR', payload: { error: errorMessage } });
    }
  }, []);

  const value = { state, dispatch, fetchDashboardData };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

// Custom hook to use the context
export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};