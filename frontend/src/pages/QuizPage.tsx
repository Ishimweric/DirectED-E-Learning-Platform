// src/components/QuizPage.tsx

import React, { useState, useEffect } from 'react';
import type { IQuiz, ISubmittedAnswer, IQuizAttempt } from '../types/quiz';
import { getQuizForLesson, submitQuizAnswers, getQuizAttempts } from "../api/quizAPI";
import QuestionDisplay from '../components/QuestionDisplay';

/**
 * MOCK correct answers and past attempts for demo purposes.
 * In a real application, these would come from the backend after submission.
 */
const MOCK_CORRECT_ANSWERS: { [key: string]: string | string[] } = {
  "q1": ["Mars", "Jupiter", "Venus"],
  "q2": "Paris",
  "q3": "True",
  "q4": "Skin",
};

/**
 * A component that displays a full quiz, handles user interactions,
 * and manages the quiz's state including loading, submission, and scoring.
 */
const QuizPage: React.FC = () => {
  const [quiz, setQuiz] = useState<IQuiz | null>(null);
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string | string[] }>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [attempts, setAttempts] = useState<IQuizAttempt[]>([]);
  // --- NEW: Timer State ---
  const [timeRemaining, setTimeRemaining] = useState<number>(600); // 10 minutes in seconds
  const [quizStarted, setQuizStarted] = useState<boolean>(false);

  // Function to fetch the quiz and attempts from the API
  const fetchQuiz = async () => {
    setLoading(true);
    setError(null);
    try {
      const lessonId = "lesson_1"; // Hardcoded for this demo
      const quizData = await getQuizForLesson(lessonId);
      const attemptsData = await getQuizAttempts(quizData._id);
      setQuiz(quizData);
      setAttempts(attemptsData);
      setUserAnswers({}); // Reset answers on new fetch
      setSubmitted(false);
      setScore(null);
      // --- NEW: Reset timer on new quiz ---
      setTimeRemaining(600);
      setQuizStarted(true);
    } catch (err) {
      console.error("Failed to fetch quiz data:", err);
      setError("Failed to load quiz. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch quiz data on component mount
  useEffect(() => {
    fetchQuiz();
  }, []);

  // --- NEW: Timer useEffect hook ---
  useEffect(() => {
    let timerId: number;
    if (quizStarted && timeRemaining > 0 && !submitted) {
      timerId = setTimeout(() => {
        setTimeRemaining(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0 && !submitted) {
      // Time is up, automatically submit the quiz
      handleSubmit();
    }

    // Cleanup function to clear the timer when the component unmounts
    // or when dependencies change.
    return () => clearTimeout(timerId);
  }, [timeRemaining, quizStarted, submitted]);

  // Handler for when a user changes an answer
  const handleAnswerChange = (questionId: string, answer: string | string[]) => {
    setUserAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: answer
    }));
  };

  // Handler for quiz submission
  const handleSubmit = async () => {
    setLoading(true);
    setQuizStarted(false); // Stop the timer
    try {
      const submittedAnswers: ISubmittedAnswer[] = Object.entries(userAnswers).map(([questionId, answer]) => ({
        questionId,
        submittedAnswer: answer
      }));
      const finalScore = await submitQuizAnswers(submittedAnswers);
      setScore(finalScore);
      setSubmitted(true);
      // Fetch updated attempts after a successful submission
      if (quiz) {
        const updatedAttempts = await getQuizAttempts(quiz._id);
        setAttempts(updatedAttempts);
      }
    } catch (err) {
      console.error("Failed to submit quiz:", err);
      setError("Failed to submit quiz. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  // Determine if all questions have been answered
  const areAllQuestionsAnswered = quiz?.questions.every(q => {
    const answer = userAnswers[q._id];
    if (q.options.length === 0) {
      // Short-answer must not be empty
      return typeof answer === 'string' && answer.trim() !== '';
    }
    // Single-choice/multi-select must have a selected answer
    return answer !== undefined && answer !== null && (Array.isArray(answer) ? answer.length > 0 : answer !== '');
  });

  // Helper function to format the time
  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Render content based on state (loading, error, success)
  if (loading && !quiz) {
    return <div className="flex justify-center items-center h-screen text-2xl font-semibold text-gray-600">Loading quiz...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500 font-semibold">{error}</div>;
  }

  if (!quiz) {
    return <div className="flex justify-center items-center h-screen text-gray-500">No quiz available for this lesson.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            Lesson 1: Solar System Quiz
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Test your knowledge of the solar system with this interactive quiz!
          </p>
        </div>

        {/* --- NEW: Timer Display --- */}
        {!submitted && (
          <div className="text-center mb-8">
            <div className={`inline-block px-6 py-2 rounded-full font-bold text-2xl ${
              timeRemaining <= 60 ? 'bg-red-500 text-white animate-pulse' : 'bg-green-500 text-white'
            }`}>
              Time Left: {formatTime(timeRemaining)}
            </div>
          </div>
        )}

        {/* Score and Attempts Display */}
        {submitted && score !== null && (
          <div className="bg-blue-600 text-white p-6 rounded-lg shadow-xl text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
            <p className="text-6xl font-extrabold">{score}%</p>
            <p className="text-xl mt-4">Great job! You can review your answers below.</p>
            <button
              onClick={fetchQuiz}
              className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition-colors"
            >
              Retake Quiz
            </button>
          </div>
        )}

        {/* Quiz Questions Section */}
        <div className="space-y-8">
          {quiz.questions.map((question, index) => (
            <QuestionDisplay
              key={question._id}
              question={question}
              questionNumber={index + 1}
              onAnswer={handleAnswerChange}
              submitted={submitted}
              score={score}
              correctAnswer={submitted ? MOCK_CORRECT_ANSWERS[question._id] : undefined}
            />
          ))}
        </div>

        {/* Submit Button */}
        {!submitted && (
          <div className="mt-12 text-center">
            <button
              onClick={handleSubmit}
              disabled={!areAllQuestionsAnswered || loading}
              className={`w-full sm:w-auto px-10 py-4 font-bold rounded-xl shadow-lg transition-all duration-300 transform ${
                areAllQuestionsAnswered && !loading
                  ? 'bg-green-600 hover:bg-green-700 text-white hover:scale-105'
                  : 'bg-gray-400 text-gray-200 cursor-not-allowed'
              }`}
            >
              {loading ? 'Submitting...' : 'Submit Quiz'}
            </button>
          </div>
        )}

        {/* Past Attempts Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Past Attempts</h2>
          {attempts.length > 0 ? (
            <ul className="space-y-2">
              {attempts.map((attempt, index) => (
                <li key={index} className="p-4 bg-white rounded-lg shadow flex justify-between items-center">
                  <span className="text-gray-600">Attempt {index + 1}</span>
                  <span className="font-semibold text-gray-800">{attempt.score}%</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No past attempts for this quiz yet.</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default QuizPage;
