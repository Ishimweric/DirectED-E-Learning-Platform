// src/pages/StudentProfile.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile, updateProfile, uploadDocument } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { CameraIcon } from '@heroicons/react/24/outline';

const StudentProfile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [role, setRole] = useState(user?.role || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        const profileData = response.data.data;
        setFirstName(profileData.firstName);
        setLastName(profileData.lastName);
        setEmail(profileData.email);
        setRole(profileData.role);
        setAvatar(profileData.avatar || '');
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch profile');
      }
    };

    fetchProfile();
  }, []);

  const handleAvatarUpload = async () => {
    if (!avatarFile) return;

    setLoading(true);
    try {
      const response = await uploadDocument(avatarFile);
      const url = response.data.data.url;
      setAvatar(url);
      return url;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to upload avatar');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      let updatedAvatar = avatar;
      if (avatarFile) {
        updatedAvatar = await handleAvatarUpload() || avatar;
      }

      const updateData = {
        firstName,
        lastName,
        avatar: updatedAvatar,
      };

      const response = await updateProfile(updateData);
      updateUser(response.data.data);
      setSuccess('Profile updated successfully');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
      navigate("/courses")
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Student Profile</h1>

        <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 relative">
              <img
                src={avatar || 'https://via.placeholder.com/128'}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
              <label htmlFor="avatar" className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer">
                <CameraIcon className="h-5 w-5 text-white" />
                <input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium mb-2">First Name:</label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium mb-2">Last Name:</label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address:</label>
              <input
                id="email"
                type="email"
                value={email}
                disabled
                className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 disabled:cursor-not-allowed"
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium mb-2">Role:</label>
              <input
                id="role"
                type="text"
                value={role.charAt(0).toUpperCase() + role.slice(1)}
                disabled
                className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded font-semibold hover:bg-green-700 disabled:bg-gray-400 transition-colors"
          >
            {loading ? 'Updating...' : 'Edit Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentProfile;