
export interface CourseData {
  _id: string;
  course: {
    title: string;
    description: string;
    thumbnail: string;
    url: string;
    lessons: any[];
  };
  totalLessons: number;
  completedLessons: number;
  completionPercentage: number;
}

export interface DashboardSummary {
  completed: number;
  inProgress: number;
  toStart: number;
}

export interface DashboardState {
  completedCourses: CourseData[];
  inProgressCourses: CourseData[];
  notStartedCourses: CourseData[];
  summary: DashboardSummary;
  isLoading: boolean;
  error: string | null;
}

// Actions for the reducer
export type DashboardAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: { completedCourses: CourseData[], inProgressCourses: CourseData[], notStartedCourses: CourseData[], summary: DashboardSummary } }
  | { type: 'FETCH_ERROR'; payload: { error: string } };