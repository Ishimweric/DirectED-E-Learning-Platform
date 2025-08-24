// src/pages/ProgressPage.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChartBarIcon, ClockIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
import { getStudentDashboard } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

interface CourseProgress {
  _id: string;
  title: string;
  progress: number;
  lastAccessed: string;
  instructor: {
    firstName: string;
    lastName: string;
  };
}

interface Certificate {
  _id: string;
  course: {
    title: string;
  };
  issuedAt: string;
  certificateUrl: string;
}

interface Activity {
  type: string;
  title: string;
  course: string;
  date: string;
  message: string;
}

const ProgressPage: React.FC = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<CourseProgress[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [stats, setStats] = useState({
    totalCourses: 0,
    completedCourses: 0,
    totalLessons: 0,
    completedLessons: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        const response = await getStudentDashboard();
        const data = response.data.data;
        
        setCourses(data.enrolledCourses || []);
        setCertificates(data.certificates || []);
        setActivities(data.recentActivity || []);
        setStats(data.stats || {
          totalCourses: 0,
          completedCourses: 0,
          totalLessons: 0,
          completedLessons: 0
        });
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch progress data');
      } finally {
        setLoading(false);
      }
    };

    fetchProgressData();
  }, []);

  if (loading) return <div className="flex justify-center py-12">Loading progress data...</div>;
  if (error) return <div className="text-red-500 text-center py-12">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 dark:text-white">

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold mb-2 dark:text-white">Welcome back, {user?.firstName}!</h1>
          <p className="text-gray-600 dark:text-white">Here's your learning progress and achievements.</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 ">
          <div className="bg-white dark:bg-gray-900 dark:text-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full mr-4">
                <AcademicCapIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalCourses}</p>
                <p className="text-gray-600 dark:text-gray-300">Total Courses</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 dark:bg-gray-900">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full mr-4">
                <ChartBarIcon className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.completedCourses}</p>
                <p className="text-gray-600 dark:text-gray-300">Completed</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 dark:bg-gray-900">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-full mr-4">
                <ClockIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.completedLessons}/{stats.totalLessons}</p>
                <p className="text-gray-600 dark:text-gray-300">Lessons Completed</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 dark:bg-gray-900">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full mr-4">
                <AcademicCapIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{certificates.length}</p>
                <p className="text-gray-600 dark:text-gray-300">Certificates</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Course Progress */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Course Progress</h2>
            <div className="space-y-4">
              {courses.map(course => (
                <div key={course._id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{course.title}</h3>
                    <span className="text-sm text-gray-500">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-500">
                      Instructor: {course.instructor.firstName} {course.instructor.lastName}
                    </span>
                    <Link 
                      to={`/courses/${course._id}`}
                      className="text-blue-600 text-sm hover:underline"
                    >
                      Continue
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-md p-6 dark:bg-gray-900">
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div key={index} className="border-b pb-3 last:border-b-0">
                  <p className="text-gray-800">{activity.message}</p>
                  <p className="text-sm text-gray-500">{new Date(activity.date).toLocaleDateString()}</p>
                </div>
              ))}
              
              {activities.length === 0 && (
                <p className="text-gray-500">No recent activity to display.</p>
              )}
            </div>
          </div>
        </div>

        {/* Certificates Section */}
        {certificates.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mt-8">
            <h2 className="text-xl font-bold mb-4">Your Certificates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certificates.map(certificate => (
                <div key={certificate._id} className="border rounded-lg p-4 flex items-center">
                  <div className="bg-yellow-100 p-3 rounded-full mr-4">
                    <AcademicCapIcon className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{certificate.course.title}</h3>
                    <p className="text-sm text-gray-500">
                      Issued: {new Date(certificate.issuedAt).toLocaleDateString()}
                    </p>
                    <a 
                      href={certificate.certificateUrl}
                      className="text-blue-600 text-sm hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Certificate
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressPage;