import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChartBarIcon, UsersIcon, AcademicCapIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { getInstructorDashboard } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

interface CourseStats {
  _id: string;
  title: string;
  totalStudents: number;
  completedStudents: number;
  avgProgress: number;
  recentEnrollments: number;
}

interface DashboardStats {
  totalCourses: number;
  totalStudents: number;
  totalRevenue: number;
  avgCourseRating: number;
}

const InstructorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<CourseStats[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalCourses: 0,
    totalStudents: 0,
    totalRevenue: 0,
    avgCourseRating: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await getInstructorDashboard();
        const data = response.data.data;
        
        setCourses(data.courses || []);
        setStats(data.stats || {
          totalCourses: 0,
          totalStudents: 0,
          totalRevenue: 0,
          avgCourseRating: 0
        });
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div className="flex justify-center py-12">Loading dashboard...</div>;
  if (error) return <div className="text-red-500 text-center py-12">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold mb-2 dark:text-white">Welcome back, {user?.firstName}!</h1>
          <p className="text-gray-600 dark:text-gray-100">Here's what's happening with the courses you've published.</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full mr-4">
                <AcademicCapIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold dark:text-gray-100">{stats.totalCourses}</p>
                <p className="text-gray-600 dark:text-slate-200">Published Courses</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full mr-4">
                <UsersIcon className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold dark:text-gray-100">{stats.totalStudents}</p>
                <p className="text-gray-600 dark:text-slate-200">Total Students</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-full mr-4">
                <CurrencyDollarIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold dark:text-gray-100">${stats.totalRevenue}</p>
                <p className="text-gray-600 dark:text-slate-200">Total Revenue</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full mr-4">
                <ChartBarIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold dark:text-white">{stats.avgCourseRating.toFixed(1)}</p>
                <p className="text-gray-600 dark:text-gray-100">Avg. Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Course Analytics */}
        <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6 dark:text-white">Course Analytics</h2>
          
          {courses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-100 mb-4">You haven't published any courses yet.</p>
              <Link 
                to="/create-course"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Create Your First Course
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 dark:bg-slate-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                      Course
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                      Students
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium dark:text-gray-200 text-gray-500 uppercase tracking-wider">
                      Completion Rate
                    </th>
                    <th className="px-6 py-3 text-left text-xs dark:text-gray-200 font-medium text-gray-500 uppercase tracking-wider">
                      Recent Enrollments
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200">
                  {courses.map(course => (
                    <tr key={course._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900 dark:text-gray-100">{course.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-900 dark:text-gray-100">{course.totalStudents}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-24 bg-gray-200  rounded-full h-2 mr-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${course.avgProgress}%` }}
                            ></div>
                          </div>
                          <span className='dark:text-white'>{course.avgProgress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-900 dark:text-gray-100">{course.recentEnrollments}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link 
            to="/create-course"
            className="bg-white dark:bg-gray-950 hover:scale-105 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="text-center">
              <div className="bg-blue-100 p-3 rounded-full inline-flex mb-4">
                <AcademicCapIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2 dark:text-white">Create New Course</h3>
              <p className="text-gray-600 dark:text-gray-100 text-sm">Start building your next course</p>
            </div>
          </Link>
          
          <Link 
            to="/instructor-profile"
            className="bg-white hover:scale-105 dark:bg-gray-950 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="text-center">
              <div className="bg-green-100 p-3 rounded-full inline-flex mb-4">
                <UsersIcon className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2 dark:text-white">Manage Profile</h3>
              <p className="text-gray-600 dark: dark:text-gray-100">Update your instructor profile</p>
            </div>
          </Link>
          
          <Link 
            to="/create-quiz"
            className="bg-white hover:scale-105 dark:bg-gray-950 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="text-center">
              <div className="bg-purple-100 p-3 rounded-full inline-flex mb-4">
                <ChartBarIcon className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2 dark:text-white">Create Quiz</h3>
              <p className="text-gray-600 text-sm dark:text-gray-100">Add assessments to your courses</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;