// src/api/quizApi.ts

import type { IQuiz, IQuizAttempt, ISubmittedAnswer } from '../types/quiz';

// --- MOCK DATA ---
const mockQuizData: IQuiz = {
  _id: "quiz123",
  lesson: "lesson_1",
  questions: [
    {
      _id: "q1",
      questionText: "Which of the following are planets in our solar system? (Select all that apply)",
      options: ["Mars", "Jupiter", "Sirius", "Venus"],
    },
    {
      _id: "q2",
      questionText: "What is the capital of France?",
      options: ["Berlin", "London", "Paris", "Madrid"],
    },
    {
      _id: "q3",
      questionText: "The Earth is the third planet from the Sun. (True or False)",
      options: ["True", "False"],
    },
    {
      _id: "q4",
      questionText: "What is the largest organ in the human body?",
      options: [], // Short-answer question
    },
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const mockAnswers = {
  "q1": ["Mars", "Jupiter", "Venus"],
  "q2": "Paris",
  "q3": "True",
  "q4": "Skin",
};

const mockAttempts: IQuizAttempt[] = [
  { quizId: "quiz123", score: 80, timestamp: new Date().toISOString() },
  { quizId: "quiz123", score: 60, timestamp: new Date().toISOString() },
  { quizId: "quiz123", score: 100, timestamp: new Date().toISOString() },
];
// --- END MOCK DATA ---

/**
 * Mocks a fetch call to get a quiz for a specific lesson.
 * @param lessonId The ID of the lesson.
 * @returns A Promise that resolves with the quiz data.
 */
export const getQuizForLesson = async (lessonId: string): Promise<IQuiz> => {
  console.log(`Mock API call: Fetching quiz for lesson ID: ${lessonId}`);
  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockQuizData;
};

/**
 * Mocks a fetch call to submit the user's answers.
 * @param answers The array of submitted answers.
 * @returns A Promise that resolves with the user's score.
 */
export const submitQuizAnswers = async (answers: ISubmittedAnswer[]): Promise<number> => {
  console.log('Mock API call: Submitting quiz answers...', answers);
  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  let correctCount = 0;
  answers.forEach(submittedAnswer => {
    const questionId = submittedAnswer.questionId;
    const submittedValue = submittedAnswer.submittedAnswer;
    const correctValue = (mockAnswers as any)[questionId];

    if (Array.isArray(submittedValue) && Array.isArray(correctValue)) {
      // For multi-select questions
      if (submittedValue.sort().toString() === correctValue.sort().toString()) {
        correctCount++;
      }
    } else if (typeof submittedValue === 'string' && typeof correctValue === 'string') {
      // For single-choice and short-answer questions
      if (submittedValue.toLowerCase().trim() === correctValue.toLowerCase().trim()) {
        correctCount++;
      }
    }
  });

  const score = Math.round((correctCount / mockQuizData.questions.length) * 100);
  console.log(`Mock API: Quiz scored. Final score: ${score}%`);
  return score;
};

/**
 * Mocks a fetch call to get a user's past quiz attempts.
 * @param quizId The ID of the quiz.
 * @returns A Promise that resolves with an array of quiz attempts.
 */
export const getQuizAttempts = async (quizId: string): Promise<IQuizAttempt[]> => {
  console.log(`Mock API call: Fetching attempts for quiz ID: ${quizId}`);
  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockAttempts;
};
