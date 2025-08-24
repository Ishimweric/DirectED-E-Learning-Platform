// src/pages/CreateQuiz.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createQuiz, getInstructorCourses } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface Question {
  question: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  options: string[];
  correctAnswer: string;
  explanation: string;
  points: number;
}

const CreateQuiz: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { lessonId: paramLessonId } = useParams<{ lessonId?: string }>();
  const [courses, setCourses] = useState<Array<{ _id: string; title: string; lessons: Array<{ _id: string; title: string }> }>>([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedLesson, setSelectedLesson] = useState(paramLessonId || '');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [timeLimit, setTimeLimit] = useState(0);
  const [passingScore, setPassingScore] = useState(70);
  const [maxAttempts, setMaxAttempts] = useState(1);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    question: '',
    type: 'multiple-choice',
    options: [],
    correctAnswer: '',
    explanation: '',
    points: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getInstructorCourses();
        // Assuming backend populates lessons
        setCourses(response.data.data.courses || []);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch courses');
      }
    };

    fetchCourses();
  }, []);

  const handleAddQuestion = () => {
    setQuestions([...questions, currentQuestion]);
    setCurrentQuestion({
      question: '',
      type: 'multiple-choice',
      options: [],
      correctAnswer: '',
      explanation: '',
      points: 1,
    });
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index] = value;
    setCurrentQuestion({ ...currentQuestion, options: newOptions });
  };

  const addOption = () => {
    setCurrentQuestion({ ...currentQuestion, options: [...currentQuestion.options, ''] });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || user.role !== 'Instructor') {
      setError('Only instructors can create quizzes');
      return;
    }

    if (!selectedLesson) {
      setError('Please select a lesson');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log({lesson: selectedLesson,
        title,
        description,
        questions,
        timeLimit,
        passingScore,
        maxAttempts,
        lessonId: paramLessonId})
      await createQuiz({
        lesson: selectedLesson,
        title,
        description,
        questions,
        timeLimit,
        passingScore,
        maxAttempts,
        lessonId: paramLessonId
      });

      navigate('/instructor-dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create quiz');
    } finally {
      setLoading(false);
    }
  };

  const selectedCourseLessons = courses.find(c => c._id === selectedCourse)?.lessons || [];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Create a new quiz</h1>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
          {/* Course Selection */}
          <div className="relative">
            <label htmlFor="course" className="block text-sm font-medium mb-2">Select Course</label>
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded p-2">
              <select
                id="course"
                value={selectedCourse}
                onChange={(e) => {
                  setSelectedCourse(e.target.value);
                  setSelectedLesson('');
                }}
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

          {/* Lesson Selection */}
          <div className="relative">
            <label htmlFor="lesson" className="block text-sm font-medium mb-2">Select Lesson</label>
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded p-2">
              <select
                id="lesson"
                value={selectedLesson}
                onChange={(e) => setSelectedLesson(e.target.value)}
                className="w-full bg-transparent focus:outline-none"
                required
                disabled={!selectedCourse}
              >
                <option value="">Select a Lesson</option>
                {selectedCourseLessons.map(lesson => (
                  <option key={lesson._id} value={lesson._id}>{lesson.title}</option>
                ))}
              </select>
              <ChevronDownIcon className="h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">Quiz Title</label>
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
            <label htmlFor="description" className="block text-sm font-medium mb-2">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="timeLimit" className="block text-sm font-medium mb-2">Time Limit (minutes)</label>
              <input
                id="timeLimit"
                type="number"
                value={timeLimit}
                onChange={(e) => setTimeLimit(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="passingScore" className="block text-sm font-medium mb-2">Passing Score (%)</label>
              <input
                id="passingScore"
                type="number"
                value={passingScore}
                onChange={(e) => setPassingScore(parseInt(e.target.value) || 70)}
                min={0}
                max={100}
                className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="maxAttempts" className="block text-sm font-medium mb-2">Max Attempts</label>
              <input
                id="maxAttempts"
                type="number"
                value={maxAttempts}
                onChange={(e) => setMaxAttempts(parseInt(e.target.value) || 1)}
                min={1}
                className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Questions Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Add Questions</h2>

            <div className="border rounded p-4 space-y-4">
              <div>
                <label htmlFor="questionText" className="block text-sm font-medium mb-2">Question</label>
                <input
                  id="questionText"
                  type="text"
                  value={currentQuestion.question}
                  onChange={(e) => setCurrentQuestion({ ...currentQuestion, question: e.target.value })}
                  className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="questionType" className="block text-sm font-medium mb-2">Question Type</label>
                <select
                  id="questionType"
                  value={currentQuestion.type}
                  onChange={(e) => setCurrentQuestion({ ...currentQuestion, type: e.target.value as Question['type'] })}
                  className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="multiple-choice">Multiple Choice</option>
                  <option value="true-false">True/False</option>
                  <option value="short-answer">Short Answer</option>
                </select>
              </div>

              {currentQuestion.type === 'multiple-choice' && (
                <div>
                  <label className="block text-sm font-medium mb-2">Options</label>
                  {currentQuestion.options.map((option, index) => (
                    <input
                      key={index}
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                      placeholder={`Option ${index + 1}`}
                    />
                  ))}
                  <button type="button" onClick={addOption} className="text-blue-600 hover:underline">Add Option</button>
                </div>
              )}

              {currentQuestion.type === 'true-false' && (
                <div>
                  <label className="block text-sm font-medium mb-2">Correct Answer</label>
                  <select
                    value={currentQuestion.correctAnswer}
                    onChange={(e) => setCurrentQuestion({ ...currentQuestion, correctAnswer: e.target.value })}
                    className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                </div>
              )}

              {currentQuestion.type === 'short-answer' && (
                <div>
                  <label htmlFor="correctAnswer" className="block text-sm font-medium mb-2">Correct Answer</label>
                  <input
                    id="correctAnswer"
                    type="text"
                    value={currentQuestion.correctAnswer}
                    onChange={(e) => setCurrentQuestion({ ...currentQuestion, correctAnswer: e.target.value })}
                    className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              <div>
                <label htmlFor="explanation" className="block text-sm font-medium mb-2">Explanation</label>
                <textarea
                  id="explanation"
                  value={currentQuestion.explanation}
                  onChange={(e) => setCurrentQuestion({ ...currentQuestion, explanation: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="points" className="block text-sm font-medium mb-2">Points</label>
                <input
                  id="points"
                  type="number"
                  value={currentQuestion.points}
                  onChange={(e) => setCurrentQuestion({ ...currentQuestion, points: parseInt(e.target.value) || 1 })}
                  min={1}
                  className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button type="button" onClick={handleAddQuestion} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Add Question</button>
            </div>

            {/* Display Added Questions */}
            {questions.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-3">Added Questions</h3>
                {questions.map((q, index) => (
                  <div key={index} className="p-4 bg-gray-100 dark:bg-gray-800 rounded mb-2">
                    <p>{index + 1}. {q.question} ({q.type})</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading || questions.length === 0}
            className="w-full bg-green-600 text-white py-3 rounded font-semibold hover:bg-green-700 disabled:bg-gray-400 transition-colors"
          >
            {loading ? 'Creating...' : 'Create Quiz'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateQuiz;