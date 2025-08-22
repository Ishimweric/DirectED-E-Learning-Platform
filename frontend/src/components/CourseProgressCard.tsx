import React from 'react';
import type { CourseData } from '../types/studentDashboard';

interface Props {
  data: CourseData;
  score?: number;
}

const CourseProgressCard: React.FC<Props> = ({ data, score }) => {
  const { course, completionPercentage } = data;

  return (
    <div className="flex items-center justify-between p-4 my-2 rounded-lg shadow-sm bg-white dark:bg-gray-700 transition-colors duration-200">
      <div className="flex items-center space-x-4">
        {/* Course Thumbnail */}
        <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden">
          <img
            src={`https://placehold.co/48x48/E2E8F0/1A202C?text=${course.title.slice(0, 1)}`}
            alt={`${course.title} thumbnail`}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Course Info */}
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">{course.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {completionPercentage ? `${completionPercentage}% Completed` : 'In Progress'}
          </p>
        </div>
      </div>
      {/* Score or Progress Circle */}
      {score && (
        <div className="p-2 font-bold rounded-full text-white text-sm bg-blue-500 dark:bg-blue-600">
          {score}
        </div>
      )}
      {!score && completionPercentage > 0 && completionPercentage < 100 && (
        <div className="relative w-12 h-12">
          <div className="absolute top-0 left-0 w-full h-full rounded-full bg-gray-200 dark:bg-gray-600"></div>
          <div
            className="absolute top-0 left-0 w-full h-full rounded-full transform"
            style={{
              background: `conic-gradient(#3B82F6 ${completionPercentage}%, transparent ${completionPercentage}%)`
            }}
          ></div>
          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-900 dark:text-gray-100">
            {completionPercentage}%
          </span>
        </div>
      )}
    </div>
  );
};

export default CourseProgressCard;