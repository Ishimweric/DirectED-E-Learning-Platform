import React, { useState, useEffect, useCallback } from 'react';
import { MagnifyingGlassIcon, XMarkIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { searchCourses } from '../../services/api';
import { Course } from '../../types';

interface SearchFilters {
  category: string;
  level: string;
  minPrice: number | '';
  maxPrice: number | '';
  rating: number | '';
}

interface SearchCoursesProps {
  onCourseSelect?: (course: Course) => void;
  placeholder?: string;
  showFilters?: boolean;
  className?: string;
}

const SearchCourses: React.FC<SearchCoursesProps> = ({
  onCourseSelect,
  placeholder = "Search courses...",
  showFilters = true,
  className = ""
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    category: '',
    level: '',
    minPrice: '',
    maxPrice: '',
    rating: ''
  });

  // Available categories and levels (could be fetched from API)
  const categories = [
    'Design', 'Development', 'Business', 'Marketing', 'Lifestyle', 'Photography', 'Music'
  ];

  const levels = ['beginner', 'intermediate', 'advanced'];

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (term: string, filters: SearchFilters) => {
      setLoading(true);
      setError('');

      try {
        const params = new URLSearchParams();
        
        if (term) params.append('search', term);
        if (filters.category) params.append('category', filters.category);
        if (filters.level) params.append('level', filters.level);
        if (filters.minPrice) params.append('minPrice', filters.minPrice.toString());
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
        if (filters.rating) params.append('rating', filters.rating.toString());

        const response = await searchCourses(params.toString());
        setCourses(response.data.data.courses || []);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to search courses');
        setCourses([]);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  // Handle search term changes
  useEffect(() => {
    if (searchTerm.trim() || Object.values(filters).some(value => value !== '')) {
      debouncedSearch(searchTerm, filters);
    } else {
      setCourses([]);
    }
  }, [searchTerm, filters, debouncedSearch]);

  // Handle filter changes
  const handleFilterChange = (key: keyof SearchFilters, value: string | number) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      category: '',
      level: '',
      minPrice: '',
      maxPrice: '',
      rating: ''
    });
  };

  // Check if any filter is active
  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>
        
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        
        {showFilters && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <button
              onClick={() => setShowFiltersPanel(!showFiltersPanel)}
              className={`p-1 rounded-md ${hasActiveFilters ? 'text-blue-600' : 'text-gray-400'} hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              aria-label="Filters"
            >
              <AdjustmentsHorizontalIcon className="h-5 w-5" />
            </button>
          </div>
        )}
        
        {searchTerm && (
          <div className="absolute inset-y-0 right-8 flex items-center pr-3">
            <button
              onClick={() => setSearchTerm('')}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
              aria-label="Clear search"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      {/* Filters Panel */}
      {showFilters && showFiltersPanel && (
        <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Filters</h3>
            <button
              onClick={resetFilters}
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              Reset All
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            {/* Level Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Level
              </label>
              <select
                value={filters.level}
                onChange={(e) => handleFilterChange('level', e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="">All Levels</option>
                {levels.map(level => (
                  <option key={level} value={level}>
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price Range
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.valueAsNumber || '')}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.valueAsNumber || '')}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                />
              </div>
            </div>
            
            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Rating
              </label>
              <select
                value={filters.rating}
                onChange={(e) => handleFilterChange('rating', e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="">Any Rating</option>
                <option value="4.5">4.5★ & above</option>
                <option value="4">4★ & above</option>
                <option value="3.5">3.5★ & above</option>
                <option value="3">3★ & above</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Search Results */}
      {(searchTerm || hasActiveFilters) && (
        <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden  fixed left-1/3 top-15">
          {loading && (
            <div className="p-4 text-center">
              <div className="flex justify-center">
                <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <p className="mt-2 text-sm text-gray-500">Searching courses...</p>
            </div>
          )}
          
          {error && (
            <div className="p-4 text-center text-red-500 text-sm">
              {error}
            </div>
          )}
          
          {!loading && !error && courses.length === 0 && (
            <div className="p-2 text-center text-gray-500">
              No courses found matching your search criteria.
            </div>
          )}
          
          {!loading && !error && courses.length > 0 && (
            <ul className="divide-y divide-gray-200 max-h-80 overflow-y-auto">
              {courses.map(course => (
                <li key={course._id}>
                  <button
                    onClick={() => onCourseSelect && onCourseSelect(course)}
                    className="w-full text-left p-4 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-16 h-12 object-cover rounded-md"
                      />
                      <div className="ml-4 flex-1">
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                          {course.title}
                        </h3>
                        <p className="text-xs text-gray-500">
                          by {typeof course.instructor === 'string' 
                          ? 'Loading...' 
                          : `${course.instructor.firstName} ${course.instructor.lastName}`
                           }
                        </p>
                        <div className="flex items-center mt-1">
                          <span className="text-xs text-yellow-600">★ {course.rating}</span>
                          <span className="mx-2 text-gray-300">•</span>
                          <span className="text-xs text-gray-500">
                            {course.studentsEnrolled} students
                          </span>
                          <span className="mx-2 text-gray-300">•</span>
                          <span className="text-xs text-gray-500">
                            {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-2">
                        <span className="text-sm font-medium text-gray-900">
                          ${course.price}
                        </span>
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

// Debounce utility function
function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: number;
  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

export default SearchCourses;