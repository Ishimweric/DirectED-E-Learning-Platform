import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PlayIcon, PauseIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { getLesson, updateLessonProgress } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

interface Lesson {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: number;
  order: number;
  course: string;
  attachments: Array<{
    name: string;
    url: string;
  }>;
}

const LessonPlayer: React.FC = () => {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const { user } = useAuth();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [completed, setCompleted] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const fetchLesson = async () => {
      if (!lessonId) return;
      
      try {
        const response = await getLesson(lessonId);
        setLesson(response.data.data.lesson);
        
        // Check if lesson is already completed
        if (response.data.data.progress?.isCompleted) {
          setCompleted(true);
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch lesson');
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [lessonId]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 0);
      
      // Update progress every 30 seconds
      if (Math.floor(videoRef.current.currentTime) % 30 === 0) {
        updateProgress(videoRef.current.currentTime);
      }
    }
  };

  const updateProgress = async (timeSpent: number) => {
    if (!lessonId || !user) return;
    
    try {
      await updateLessonProgress(lessonId, {
        timeSpent,
        isCompleted: timeSpent / duration > 0.9 // Mark as completed if watched 90%
      });
      
      if (timeSpent / duration > 0.9 && !completed) {
        setCompleted(true);
      }
    } catch (err) {
      console.error('Failed to update progress:', err);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (loading) return <div className="flex justify-center py-12 dark:text-white text-slate-900">Loading lesson...</div>;
  if (error) return <div className="text-red-500 text-center py-12">Error: {error}</div>;
  if (!lesson) return <div className="text-center py-12">Lesson not found</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-4 flex justify-between items-center">
        <Link 
          to={`/courses/${courseId}`}
          className="flex items-center text-blue-400 hover:text-blue-300"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Course
        </Link>
        <h1 className="text-xl font-bold">{lesson.title}</h1>
        <div className="w-24"></div> {/* Spacer for balance */}
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Video Player */}
          <div className="lg:col-span-3">
            <div className="bg-black rounded-lg overflow-hidden ">
              <video
                ref={videoRef}
                src={lesson.videoUrl}
                className="w-full h-96"
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => {
                  setIsPlaying(false);
                  updateProgress(duration);
                  setCompleted(true);
                }}
              />
              
              {/* Video Controls */}
              <div className="bg-gray-800 p-4">
                <div className="flex items-center mb-2">
                  <button
                    onClick={handlePlayPause}
                    className="bg-blue-600 p-2 rounded-full mr-4"
                  >
                    {isPlaying ? (
                      <PauseIcon className="h-6 w-6" />
                    ) : (
                      <PlayIcon className="h-6 w-6" />
                    )}
                  </button>
                  
                  <div className="flex-1 bg-gray-700 rounded-full h-2 mr-4">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    ></div>
                  </div>
                  
                  <span className="text-sm">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className={completed ? "text-green-400" : "text-yellow-400"}>
                    {completed ? "Completed" : "In Progress"}
                  </span>
                  
                  <div className="flex space-x-2">
                    <button className="text-gray-400 hover:text-white">
                      <ArrowLeftIcon className="h-5 w-5" />
                    </button>
                    <button className="text-gray-400 hover:text-white">
                      <ArrowRightIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Lesson Details */}
            <div className="bg-gray-800 rounded-lg p-6 mt-6">
              <h2 className="text-2xl font-bold mb-4">About this lesson</h2>
              <p className="text-gray-300 mb-6">{lesson.description}</p>
              
              {lesson.attachments && lesson.attachments.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold mb-3">Attachments</h3>
                  <div className="space-y-2">
                    {lesson.attachments.map((attachment, index) => (
                      <a
                        key={index}
                        href={attachment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-3 bg-gray-700 rounded hover:bg-gray-600"
                      >
                        <span className="text-blue-400 hover:text-blue-300">
                          {attachment.name}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Course Navigation Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-bold mb-4">Course Content</h3>
              <div className="space-y-2">
                <div className="p-2 bg-blue-600 rounded">
                  <p className="text-sm">{lesson.title}</p>
                  <div className="w-full bg-gray-600 rounded-full h-1 mt-1">
                    <div 
                      className="bg-green-500 h-1 rounded-full" 
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Notes Section to be continued */}
            <div className="bg-gray-800 rounded-lg p-4 mt-4">
              <h3 className="text-lg font-bold mb-3">Notes</h3>
              <textarea
                placeholder="Add your notes here..."
                className="w-full bg-gray-700 text-white p-3 rounded resize-none"
                rows={5}
              ></textarea>
              <button className="w-full bg-blue-600 text-white py-2 rounded mt-2 hover:bg-blue-700">
                Save Notes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPlayer;