// src/pages/CreateLesson.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createLesson, getInstructorCourses, uploadDocument } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { CameraIcon, DocumentIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const CreateLesson: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { courseId: paramCourseId } = useParams<{ courseId?: string }>();
  const [courses, setCourses] = useState<Array<{ _id: string; title: string }>>([]);
  const [selectedCourse, setSelectedCourse] = useState(paramCourseId || '');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [order, setOrder] = useState(1);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [documentUrl, setDocumentUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getInstructorCourses();
        setCourses(response.data.data.courses || []);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch courses');
      }
    };

    fetchCourses();
  }, []);

  const handleUpload = async (file: File | null, type: 'video' | 'document') => {
    if (!file) return;

    setLoading(true);
    try {
      const response = await uploadDocument(file);
      const url = response.data.data.url;
      if (type === 'video') {
        setVideoUrl(url);
      } else {
        setDocumentUrl(url);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || `Failed to upload ${type}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || user.role !== 'Instructor') {
      setError('Only instructors can create lessons');
      return;
    }

    if (!selectedCourse) {
      setError('Please select a course');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await createLesson({
        course: selectedCourse,
        title,
        description,
        videoUrl,
        duration,
        order,
        attachments: documentUrl ? [{ name: documentFile?.name || 'Document', url: documentUrl }] : [],
        isPreview: false, // Default
      });

      navigate(`/courses/${selectedCourse}`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create lesson');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Create a new lesson</h1>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
          {/* Course Selection */}
          <div className="relative">
            <label htmlFor="course" className="block text-sm font-medium mb-2">Course & Lesson</label>
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded p-2">
              <select
                id="course"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full bg-transparent focus:outline-none"
                required
              >
                <option value="">Select a Course</option>
                {courses.map(course => (
                  <option key={course._id} value={course._id}>{course.title}</option>
                ))}
              </select>
              <ChevronDownIcon className="h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="text-center text-gray-500 text-sm mb-6">Selected Courses</div>

          {/* Lesson Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">Lesson Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2">Lesson Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Duration */}
          <div>
            <label htmlFor="duration" className="block text-sm font-medium mb-2">Duration (minutes)</label>
            <input
              id="duration"
              type="number"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Order */}
          <div>
            <label htmlFor="order" className="block text-sm font-medium mb-2">Order</label>
            <input
              id="order"
              type="number"
              value={order}
              onChange={(e) => setOrder(parseInt(e.target.value) || 1)}
              min={1}
              className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-dashed border-gray-300 dark:border-gray-700 rounded p-8 text-center">
              <label htmlFor="video" className="cursor-pointer">
                <CameraIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>Upload video</p>
                <input
                  id="video"
                  type="file"
                  accept="video/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setVideoFile(file);
                    handleUpload(file, 'video');
                  }}
                  className="hidden"
                />
              </label>
              {videoFile && <p className="mt-2 text-sm text-gray-500">{videoFile.name}</p>}
            </div>

            <div className="border border-dashed border-gray-300 dark:border-gray-700 rounded p-8 text-center">
              <label htmlFor="document" className="cursor-pointer">
                <DocumentIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>Upload documents</p>
                <input
                  id="document"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setDocumentFile(file);
                    handleUpload(file, 'document');
                  }}
                  className="hidden"
                />
              </label>
              {documentFile && <p className="mt-2 text-sm text-gray-500">{documentFile.name}</p>}
            </div>
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="flex space-x-4">
            <button
              type="button"
              className="flex-1 bg-gray-600 text-white py-3 rounded font-semibold hover:bg-gray-700 transition-colors"
              onClick={() => navigate('/instructor-dashboard')}
            >
              Save as Draft
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-green-600 text-white py-3 rounded font-semibold hover:bg-green-700 disabled:bg-gray-400 transition-colors"
            >
              {loading ? 'Creating...' : 'Next'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateLesson;