import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

// Helper function to get the number of days in a month
const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

// Helper function to get the day of the week for the first day of the month
const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay();
};

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  // Array of day names for the header
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Generate an array of days for the calendar grid
  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  // Handle month navigation
  const goToPrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm mx-auto font-sans">
      <div className="flex justify-between items-center mb-4">
        <button onClick={goToPrevMonth} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
        </button>
        <h2 className="text-xl font-semibold text-gray-800">
          {monthName} {year}
        </h2>
        <button onClick={goToNextMonth} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <ChevronRightIcon className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-sm text-center text-gray-500">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="font-medium">{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 mt-2 text-sm text-gray-700">
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg text-center ${day ? 'hover:bg-blue-50 transition-colors cursor-pointer' : 'opacity-50'}`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;