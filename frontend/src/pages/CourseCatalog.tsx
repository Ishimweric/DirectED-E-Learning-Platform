// src/pages/CourseCatalog.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { getCourses } from '../services/api';

interface Course {
  _id: string;
  title: string;
  description: string;
  instructor: {
    firstName: string;
    lastName: string;
  };
  thumbnail: string;
  price: number;
  category: string;
  level: string;
  rating: number;
}

const CourseCatalog: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCourses();
        setCourses(response.data.data.courses);
        setFilteredCourses(response.data.data.courses);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const filtered = courses.filter(course =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(filtered);
  }, [searchTerm, courses]);

  if (loading) return <div className="flex justify-center py-12">Loading courses...</div>;
  if (error) return <div className="text-red-500 text-center py-12">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-200">

      {/* Hero Section */}
      <div className="bg-blue-600 dark:bg-cyan-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Find Your Perfect Course</h1>
          <p className="text-xl mb-8">Discover a wide range of courses taught by industry experts</p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute right-2 top-2 bg-blue-500 p-1 rounded">
              <AdjustmentsHorizontalIcon className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map(course => (
            <div key={course._id} className="bg-white dark:bg-dark-300 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <video src={course.thumbnail} controls className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 dark:text-white">{course.title}</h3>
                <p className="text-gray-600 mb-4 dark:text-gray-100">{course.description.substring(0, 100)}...</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-blue-600 font-bold">${course.price}</span>
                  <span className="bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-gray-100  px-2 py-1 rounded text-sm">{course.level}</span>
                </div>
                <Link 
                  to={`/courses/${course._id}`}
                  className="block w-full bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  View Course
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-xl">No courses found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCatalog;