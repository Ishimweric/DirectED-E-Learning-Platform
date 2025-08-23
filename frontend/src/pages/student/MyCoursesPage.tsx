import type { FC } from "react";
import { Link } from "react-router-dom";
import { CourseCard } from "../../components/courses/CourseCard";
import type { Course,  } from "../../types/api";

// Define a type for enrolled courses including user-specific progress
interface EnrolledCourse extends Course {
  progress: number;
}

// Mock enrolled courses data
const enrolledCourses: EnrolledCourse[] = [
  {
    id: "1",
    title: "UX/UI Design",
    description: "Learn the fundamentals of user experience and interface design",
    instructorId: "1",
    instructor: {
      id: "1",
      fullName: "Sarah Johnson",
      email: "sarah@example.com",
      role: "instructor",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    duration: 8 * 7 * 24 * 60, // 8 weeks in minutes
    level: "Beginner",
    thumbnail: "/placeholder.svg?height=200&width=300",
    price: 99,
    category: "Design",
    rating: 4.8,
    studentsCount: 1234,
    isEnroll: true,
    isPublished: true,
    progress: 65,
  },
  {
    id: "2",
    title: "React Development",
    description: "Master React.js and build modern web applications",
    instructorId: "2",
    instructor: {
      id: "2",
      fullName: "John Smith",
      email: "john@example.com",
      role: "instructor",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    duration: 10 * 7 * 24 * 60, // 10 weeks in minutes
    level: "Intermediate",
    thumbnail: "/placeholder.svg?height=200&width=300",
    price: 129,
    category: "Programming",
    rating: 4.9,
    studentsCount: 2156,
    isEnroll: true,
    isPublished: true,
    progress: 30,
  },
  {
    id: "3",
    title: "Digital Marketing",
    description: "Learn effective digital marketing strategies and techniques",
    instructorId: "3",
    instructor: {
      id: "3",
      fullName: "Emily Davis",
      email: "emily@example.com",
      role: "instructor",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    duration: 6 * 7 * 24 * 60, // 6 weeks in minutes
    level: "Beginner",
    thumbnail: "/placeholder.svg?height=200&width=300",
    price: 79,
    category: "Marketing",
    rating: 4.7,
    studentsCount: 987,
    isEnroll: true,
    isPublished: true,
    progress: 90,
  },
];

const MyCoursesPage: FC = () => {
  const inProgressCourses = enrolledCourses.filter(
    (course) => course.progress > 0 && course.progress < 100
  );

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Courses</h1>
        <p className="text-gray-600">
          Track your learning progress and continue your educational journey
        </p>
      </div>

      {/* Continue Learning Section */}
      {inProgressCourses.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Continue Learning</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inProgressCourses.map((course) => (
              <div key={course.id} className="relative">
                <CourseCard course={course} />
                <div className="mt-3">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{course.progress ?? 0}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress ?? 0}%` }}
                    ></div>
                  </div>
                </div>
                <Link
                  to={`/courses/${course.id}/learn`}
                  className="mt-3 block w-full text-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Continue Learning
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Enrolled Courses */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">All My Courses</h2>
          <div className="flex items-center space-x-4">
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option>All Courses</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option>Sort by Progress</option>
              <option>Sort by Date</option>
              <option>Sort by Name</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((course) => (
            <div key={course.id} className="relative">
              <CourseCard course={course} />
              <div className="mt-3">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{course.progress ?? 0}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${course.progress ?? 0}%` }}
                  ></div>
                </div>
              </div>
              <div className="mt-3 flex space-x-2">
                <Link
                  to={`/courses/${course.id}/learn`}
                  className="flex-1 text-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  {course.progress === 100 ? "Review" : "Continue"}
                </Link>
                <Link
                  to={`/courses/${course.id}`}
                  className="flex-1 text-center border border-green-600 text-green-600 py-2 rounded-lg hover:bg-green-50 transition-colors"
                >
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {enrolledCourses.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses enrolled yet</h3>
          <p className="text-gray-600 mb-6">
            Start your learning journey by enrolling in a course
          </p>
          <Link
            to="/courses"
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Browse Courses
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyCoursesPage;
