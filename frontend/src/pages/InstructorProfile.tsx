// src/pages/InstructorProfile.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getInstructorCourses } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

interface Course {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  studentsEnrolled: number;
  rating: number;
  isPublished: boolean;
}

const InstructorProfile: React.FC = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInstructorCourses = async () => {
      try {
        const response = await getInstructorCourses();
        setCourses(response.data.data.courses || []);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch instructor courses');
      } finally {
        setLoading(false);
      }
    };

    fetchInstructorCourses();
  }, []);

  if (loading) return <div className="flex justify-center py-12">Loading profile...</div>;
  if (error) return <div className="text-red-500 text-center py-12">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <div className="w-32 h-32 bg-gray-300 rounded-full mb-4 md:mb-0 md:mr-6"></div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{user?.firstName} {user?.lastName}</h1>
              <p className="text-blue-600 font-semibold mb-4">Instructor at DirectEd</p>
              
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-2">About Me</h2>
                <p className="text-gray-600">
                  Hi there! I'm a passionate instructor always looking for new challenges and skills to master. 
                  I love diving into topics like web development and photography and connecting with people who 
                  share similar interests. Let's learn and grow together!
                </p>
              </div>
              
              <div className="flex space-x-4">
                <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
                  <span className="font-semibold">{courses.length}</span> Courses
                </div>
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full">
                  <span className="font-semibold">
                    {courses.reduce((total, course) => total + course.studentsEnrolled, 0)}
                  </span> Students
                </div>
                <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full">
                  <span className="font-semibold">
                    {courses.length > 0 
                      ? (courses.reduce((total, course) => total + course.rating, 0) / courses.length).toFixed(1)
                      : '0.0'
                    }
                  </span> Rating
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Courses Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Courses I've Published</h2>
            <Link 
              to="/create-course"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Create New Course
            </Link>
          </div>
          
          {courses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">You haven't published any courses yet.</p>
              <Link 
                to="/create-course"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Create Your First Course
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map(course => (
                <div key={course._id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <video src={course.thumbnail} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{course.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                    
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-gray-500">{course.studentsEnrolled} students</span>
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="text-sm">{course.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Link 
                        to={`/courses/${course._id}/edit`}
                        className="flex-1 bg-gray-200 text-gray-800 text-center py-2 rounded text-sm hover:bg-gray-300"
                      >
                        Edit
                      </Link>
                      <Link 
                        to={`/courses/${course._id}`}
                        className="flex-1 bg-blue-600 text-white text-center py-2 rounded text-sm hover:bg-blue-700"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Work in Progress Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-2xl font-bold mb-6">Work in Progress</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold">UX Fundamentals</h3>
                <p className="text-sm text-gray-500">3 of 8 lessons completed</p>
              </div>
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '37%' }}></div>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold">Information Architecture</h3>
                <p className="text-sm text-gray-500">Not started</p>
              </div>
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorProfile;