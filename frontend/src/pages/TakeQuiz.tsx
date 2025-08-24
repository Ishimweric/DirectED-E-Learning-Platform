// src/pages/TakeQuiz.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuiz, submitQuiz } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { ClockIcon } from '@heroicons/react/24/outline';

interface Question {
  _id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  options: string[];
  explanation: string; // Not shown until submission
  points: number;
}

interface Quiz {
  _id: string;
  title: string;
  description: string;
  questions: Question[];
  timeLimit: number;
  passingScore: number;
  maxAttempts: number;
}

const TakeQuiz: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [passed, setPassed] = useState(false);
  const [feedback, setFeedback] = useState<Array<{ questionId: string; isCorrect: boolean; explanation: string }>>([]);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!quizId) return;

      try {
        const response = await getQuiz(quizId);
        const quizData = response.data.data;
        setQuiz(quizData);
        setTimeLeft(quizData.timeLimit * 60); // Convert minutes to seconds
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch quiz');
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  useEffect(() => {
    if (timeLeft > 0 && !submitted) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !submitted) {
      handleSubmit();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timeLeft, submitted]);

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = async () => {
    if (!quizId || !user || submitted) return;

    setSubmitted(true);
    setLoading(true);
    try {
      const formattedAnswers = Object.keys(answers).map(questionId => ({
        question: questionId,
        answer: answers[questionId],
      }));
      
      const response = await submitQuiz(quizId, {
        answers: formattedAnswers,
        timeSpent: (quiz?.timeLimit || 0) * 60 - timeLeft,
      });
      
      const data = response.data.data;
      setScore(data.attempt.score);
      setPassed(data.passed);
      setFeedback(data.correctAnswers.map((item: any) => ({
        questionId: item.question,
        isCorrect: data.attempt.answers.find((a: any) => a.question === item.question)?.isCorrect || false,
        explanation: item.explanation,
      })));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to submit quiz');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (loading) return <div className="flex justify-center py-12">Loading quiz...</div>;
  if (error) return <div className="text-red-500 text-center py-12">Error: {error}</div>;
  if (!quiz) return <div className="text-center py-12">Quiz not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4 text-center">{quiz.title}</h1>
        <p className="text-center mb-8">{quiz.description}</p>

        <div className="flex justify-center mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex items-center">
            <ClockIcon className="h-6 w-6 mr-2 text-red-500" />
            <span className="font-semibold">Time Left: {formatTime(timeLeft)}</span>
          </div>
        </div>

        {!submitted ? (
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-8">
            {quiz.questions.map((question, index) => (
              <div key={question._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">{index + 1}. {question.question}</h2>

                {question.type === 'multiple-choice' && (
                  <div className="space-y-2">
                    {question.options.map((option, optIndex) => (
                      <label key={optIndex} className="flex items-center">
                        <input
                          type="radio"
                          name={question._id}
                          value={option}
                          checked={answers[question._id] === option}
                          onChange={() => handleAnswerChange(question._id, option)}
                          className="mr-2"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                )}

                {question.type === 'true-false' && (
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name={question._id}
                        value="true"
                        checked={answers[question._id] === 'true'}
                        onChange={() => handleAnswerChange(question._id, 'true')}
                        className="mr-2"
                      />
                      True
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name={question._id}
                        value="false"
                        checked={answers[question._id] === 'false'}
                        onChange={() => handleAnswerChange(question._id, 'false')}
                        className="mr-2"
                      />
                      False
                    </label>
                  </div>
                )}

                {question.type === 'short-answer' && (
                  <input
                    type="text"
                    value={answers[question._id] || ''}
                    onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                    className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
            >
              {loading ? 'Submitting...' : 'Submit Quiz'}
            </button>
          </form>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">{passed ? 'Congratulations!' : 'Quiz Results'}</h2>
            <p className="text-center text-xl mb-6">Your score: {score}% {passed ? '(Passed)' : '(Failed)'}</p>

            <div className="space-y-6">
              {feedback.map((fb, index) => {
                const question = quiz.questions[index];
                return (
                  <div key={fb.questionId} className="border-b pb-4 last:border-b-0">
                    <h3 className="font-semibold mb-2">{index + 1}. {question.question}</h3>
                    <p className="mb-2">Your answer: {answers[fb.questionId]}</p>
                    <p className={fb.isCorrect ? "text-green-600" : "text-red-600"}>
                      {fb.isCorrect ? 'Correct' : 'Incorrect'}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">Explanation: {fb.explanation}</p>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => navigate('/dashboard')}
              className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 mt-6"
            >
              Back to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TakeQuiz;