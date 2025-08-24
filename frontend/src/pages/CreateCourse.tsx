// src/pages/CreateCourse.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCourse, uploadDocument, publishCourse } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { CameraIcon, DocumentIcon } from '@heroicons/react/24/outline';

const CreateCourse: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [publishDate, setPublishDate] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [documentUrl, setDocumentUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [courseId, setCourseId] = useState('');

  const handleUpload = async (file: File | null, type: 'video' | 'document') => {
    if (!file) return;

    setLoading(true);
    try {
      const response = await uploadDocument(file);
      const url = response.data.data.url;
      if (type === 'video') {
        setVideoUrl(url);
        console.log(documentUrl,courseId);
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
      setError('Only instructors can create courses');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Create course
      const courseResponse = await createCourse({
        title,
        description,
        category: 'Uncategorized', // Default; add field if needed
        level: 'beginner', // Default; add field if needed
        price: 0, // Default; add field if needed
        thumbnail: videoUrl || '', // Use video as thumbnail or add separate upload
      });

      setCourseId(courseResponse.data.data._id);

      // Publish if date is set
      if (publishDate) {
        await publishCourse(courseResponse.data.data._id, true);
      }

      navigate('/instructor-dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Create Course</h1>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="publishDate" className="block text-sm font-medium mb-2">Publish Date</label>
            <input
              id="publishDate"
              type="date"
              value={publishDate}
              onChange={(e) => setPublishDate(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2">Course Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded font-semibold hover:bg-green-700 disabled:bg-gray-400 transition-colors"
          >
            {loading ? 'Creating...' : 'PUBLISH'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;