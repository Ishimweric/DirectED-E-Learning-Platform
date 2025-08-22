import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useDashboard } from '../contexts/DashboardContext';
import CourseProgressCard from '../components/CourseProgressCard';
import MyProgressChart from '../components/MyProgressChart';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth(); // Assume user object contains a token
  const { state, fetchDashboardData } = useDashboard();
  const { completedCourses, inProgressCourses, summary, isLoading, error } = state;

  useEffect(() => {
    // Check if the user is authenticated before fetching data
    if (user?.token) {
      fetchDashboardData(user.token);
    }
  }, [user, fetchDashboardData]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-gray-900 text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8 transition-colors duration-200">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column for calendar and overall progress chart */}
        <div className="col-span-1 flex flex-col space-y-6">
          <MyProgressChart summary={summary} />

          {/* Placeholder for the Calendar */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-bold mb-4">Calendar (Not Implemented)</h2>
            <p className="text-gray-500 dark:text-gray-400">Placeholder for a calendar component.</p>
          </div>
        </div>

        {/* Right Column for course lists */}
        <div className="col-span-1 lg:col-span-2 space-y-6">
          {/* Completed Courses Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md transition-colors duration-200">
            <h2 className="text-xl font-bold mb-4 flex justify-between items-center">
              <span>Completed Courses</span>
              <span className="text-sm font-medium text-blue-500 dark:text-blue-400 cursor-pointer">
                See All
              </span>
            </h2>
            <div className="space-y-4">
              {completedCourses.length > 0 ? completedCourses.map((item) => (
                <CourseProgressCard
                  key={item._id}
                  data={item}
                  score={98} // Example score from design
                />
              )) : (
                <p className="text-gray-500 dark:text-gray-400">No completed courses yet.</p>
              )}
            </div>
          </div>

          {/* Progress Per Course Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md transition-colors duration-200">
            <h2 className="text-xl font-bold mb-4">Progress Per Course</h2>
            <div className="space-y-4">
              {inProgressCourses.length > 0 ? inProgressCourses.map((item) => (
                <CourseProgressCard
                  key={item._id}
                  data={item}
                />
              )) : (
                <p className="text-gray-500 dark:text-gray-400">No courses in progress yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
