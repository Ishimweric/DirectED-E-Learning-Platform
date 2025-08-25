// src/pages/CourseDetail.tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ClockIcon, UserIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { getCourse, enrollInCourse } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { useCourse } from '../contexts/CourseContext';

interface Course {
  _id: string;
  title: string;
  description: string;
  instructor: {
    _id: string;
    firstName: string;
    lastName: string;
    bio: string;
  };
  thumbnail: string;
  price: number;
  category: string;
  level: string;
  duration: number;
  studentsEnrolled: number;
  rating: number;
  requirements: string[];
  learningOutcomes: string[];
  lessons: Array<{
    _id: string;
    title: string;
    description: string;
    duration: number;
    order: number;
    isPreview: boolean;
  }>;
  isPublished: boolean;
}

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [enrolling, setEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const { loadCourse, currentCourse } = useCourse();
  const navigate = useNavigate();
  let firstLessonId;
  const [courseDuration, setCourseDuration] = useState(generateRandomNum())

  //setCourseDuration
  console.log(typeof(setCourseDuration));

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) return;
      
      try {
        const response = await getCourse(id);
        setCourse(response.data.data);
        await loadCourse(id);
        
        // Check if user is enrolled
        if (user && response.data.data.enrolled) {
          setEnrolled(true);
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch course');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, user, loadCourse, currentCourse]);

  const handleEnroll = async () => {
    if (!id || !user) return;
    
    setEnrolling(true);
    try {
      await enrollInCourse(id);
      await loadCourse(id);
      setEnrolled(true);
      // Navigate to the first lesson of the course
      if (currentCourse && currentCourse.lessons && currentCourse.lessons.length > 0) {
        console.log("reached in lesson", currentCourse.lessons.length);
        firstLessonId = currentCourse.lessons[0];
        navigate(`/learn/${id}/${firstLessonId}`);
      } else {
        // If no lessons, navigate to the course overview
        navigate(`/learn/${id}`);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to enroll in course');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) return <div className="flex justify-center py-12 dark:text-white animate-pulse text-xl font-bold">Loading course...</div>;
  if (error) return <div className="text-red-500 text-center py-12">Error: {error}</div>;
  if (!course) return <div className="text-center py-12">Course not found</div>;

  function generateRandomNum():number{
    const min = 4;
    const max = 20;
    let random = Math.floor(Math.random()*(max - min + 1)) + min
    return random
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md p-6 mb-6">
              <h1 className="text-3xl font-bold mb-4 dark:text-white">{course.title}</h1>
              <p className="text-gray-600 mb-4 dark:text-white">{course.description}</p>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center dark:text-white">
                  <ClockIcon className="h-5 w-5 text-gray-500 mr-1" />
                  <span>{courseDuration} weeks</span>
                </div>
                <div className="flex items-center">
                  <UserIcon className="h-5 w-5 text-gray-500 mr-1 dark:text-gray-50" />
                  <span className='dark:text-gray-50'>{course.studentsEnrolled} students</span>
                </div>
                <div className="flex items-center">
                  <ChartBarIcon className="h-5 w-5 text-gray-500 mr-1" />
                  <span className='text-gray-100'>{course.level}</span>
                </div>
              </div>

              {/* Instructor */}
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2 dark:text-gray-200">Instructor</h3>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                  <div>
                    <p className="font-semibold dark:text-white">{course.instructor.firstName} {course.instructor.lastName}</p>
                    <p className="text-gray-600 text-sm dark:text-gray-100">{course.instructor.bio}</p>
                  </div>
                </div>
              </div>

              {/* What you'll learn */}
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2 dark:text-white">What you'll learn</h3>
                <ul className="list-disc list-inside">
                  {course.learningOutcomes.map((outcome, index) => (
                    <li key={index} className="mb-1 dark:text-gray-100">{outcome}</li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2 dark:text-white">Requirements</h3>
                <ul className="list-disc list-inside">
                  {course.requirements.map((requirement, index) => (
                    <li key={index} className="mb-1 dark:text-gray-100">{requirement}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Course Curriculum */}
            <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">Course Curriculum</h2>
              <div className="space-y-3">
                {course.lessons.map(lesson => (
                  <Link to={`/learn/${course._id}/${lesson._id}`} key={lesson._id} className="flex hover:opacity-85 justify-between items-center p-3 border rounded">
                    <div>
                      <h4 className="font-semibold dark:text-gray-100">{lesson.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-200">{lesson.description}</p>
                    </div>
                    <span className="text-gray-500 dark:text-white">{lesson.duration} min</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4 dark:bg-dark-200">
              <video src={course.thumbnail} controls className="w-full h-48 object-cover rounded mb-4" />
              <p className="text-3xl font-bold text-blue-600 mb-4">${course.price}</p>
              
              {enrolled ? (
                <Link
                  // to={`/learn/${course._id}/${firstLessonId}`} , down is a hardcoded value to be changed later
                  to={`/learn/68a9e18536cf2833177e58cf/68a9f4c9798f513c5c8709db`}
                  className="block w-full bg-green-600 text-white text-center py-3 rounded font-semibold mb-4"
                >
                  Continue Learning
                </Link>
              ) : (
                <button
                  onClick={handleEnroll}
                  disabled={enrolling || !user}
                  className="w-full bg-blue-600 text-white py-3 rounded font-semibold mb-4 disabled:bg-gray-400"
                >
                  {enrolling ? 'Enrolling...' : 'Enroll Now'}
                </button>
              )}
              
              {!user && (
                <p className="text-sm text-gray-600 text-center dark:text-gray-100">
                  <Link to="/login" className="text-blue-600">Sign in</Link> to enroll in this course
                </p>
              )}

              <div className="border-t pt-4 mt-4">
                <h4 className="font-semibold mb-2 dark:text-white">This course includes:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center dark:text-gray-100">
                    <ClockIcon className="h-5 w-5 text-gray-500 mr-2" />
                    <span>{course.duration || courseDuration} hours on-demand video</span>
                  </li>
                  <li className="flex items-center dark:text-gray-100">
                    <UserIcon className="h-5 w-5 text-gray-500 mr-2" />
                    <span>Full lifetime access</span>
                  </li>
                  <li className="flex items-center dark:text-gray-100">
                    <ChartBarIcon className="h-5 w-5 text-gray-500 mr-2" />
                    <span>Certificate of completion</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;