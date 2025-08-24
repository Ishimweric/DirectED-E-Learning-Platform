// src/components/Sidebar.tsx
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  HomeIcon,
  AcademicCapIcon,
  BookOpenIcon,
  BellIcon,
  UserIcon,
  PlusCircleIcon,
  ChartBarIcon,
  DocumentTextIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const location = useLocation();

  

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Student navigation items
  const studentNavItems = [
    { path: '/progress', label: 'Dashboard', icon: HomeIcon },
    { path: '/courses', label: 'Browse Courses', icon: AcademicCapIcon },
    { path: '/courses', label: 'My Courses', icon: BookOpenIcon },
    { path: '/notifications', label: 'Notifications', icon: BellIcon },
    { path: '/profile', label: 'Profile', icon: UserIcon },
  ];

  // Instructor navigation items
  const instructorNavItems = [
    { path: '/instructor-dashboard', label: 'Dashboard', icon: HomeIcon },
    { path: '/create-course', label: 'Create Course', icon: PlusCircleIcon },
    { path: '/notifications', label: 'Notifications', icon: BellIcon },
    { path: '/analytics', label: 'Student Analytics', icon: ChartBarIcon },
    { path: '/create-quiz', label: 'Quizzes', icon: DocumentTextIcon },
    { path: '/profile', label: 'Profile', icon: UserIcon },
  ];

  const navItems = user?.role === 'Instructor' ? instructorNavItems : studentNavItems;

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Overlay for all screen sizes */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar - Always overlays on top */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <Link to="/" className="flex items-center space-x-2" onClick={onClose}>
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <span className="text-xl font-bold text-gray-800 dark:text-white">DirectEd</span>
            </Link>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
              aria-label="Close sidebar"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation items */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActivePath(item.path);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User info at bottom */}
          {user && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {user.firstName.charAt(0)}
                  {user.lastName.charAt(0)}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;