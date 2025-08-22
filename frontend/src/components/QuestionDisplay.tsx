// src/components/QuestionDisplay.tsx

import React, { useState, useEffect } from 'react';
import type { IQuestion } from '../types/quiz';

/**
 * Props for the QuestionDisplay component.
 */
interface QuestionDisplayProps {
  question: IQuestion;
  questionNumber: number;
  onAnswer: (questionId: string, answer: string | string[]) => void;
  submitted: boolean;
  score: number | null;
  correctAnswer?: string | string[];
}

/**
 * A component to display a single quiz question and handle user input.
 * It adapts its rendering based on the question type (multiple choice, true/false, short answer).
 * It also displays correctness feedback after the quiz is submitted.
 */
const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  question,
  questionNumber,
  onAnswer,
  submitted,
  score,
  correctAnswer,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | string[]>([]);
  const isMultiSelect = question.options.length > 2 && question.questionText.toLowerCase().includes('select all that apply');
  const isShortAnswer = question.options.length === 0;
  const isCorrect = submitted && score !== null && (JSON.stringify(selectedAnswer) === JSON.stringify(correctAnswer));

  // Handle multi-select changes
  const handleMultiSelectChange = (option: string) => {
    let newSelected: string[];
    if (Array.isArray(selectedAnswer)) {
      if (selectedAnswer.includes(option)) {
        newSelected = selectedAnswer.filter(item => item !== option);
      } else {
        newSelected = [...selectedAnswer, option];
      }
    } else {
      newSelected = [option];
    }
    setSelectedAnswer(newSelected);
    onAnswer(question._id, newSelected);
  };

  // Handle single-select and short-answer changes
  const handleSingleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedAnswer(value);
    onAnswer(question._id, value);
  };

  useEffect(() => {
    // Reset state when the question changes
    setSelectedAnswer([]);
  }, [question._id]);

  const getBackgroundColor = () => {
    if (!submitted) return 'bg-white';
    if (isCorrect) return 'bg-green-100';
    return 'bg-red-100';
  };

  const renderOptions = () => {
    if (isShortAnswer) {
      return (
        <div className="mt-4">
          <input
            type="text"
            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 transition-colors ${submitted ? 'bg-gray-200' : 'bg-white'}`}
            placeholder="Type your answer here..."
            value={typeof selectedAnswer === 'string' ? selectedAnswer : ''}
            onChange={handleSingleAnswerChange}
            disabled={submitted}
          />
        </div>
      );
    }

    const inputType = isMultiSelect ? 'checkbox' : 'radio';
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {question.options.map((option, index) => (
          <label key={index} className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-all hover:bg-gray-50 ${submitted ? (Array.isArray(correctAnswer) && correctAnswer.includes(option) ? 'border-green-500 bg-green-50' : '') : ''}`}>
            {isMultiSelect ? (
              <input
                type={inputType}
                name={`question-${question._id}`}
                value={option}
                checked={Array.isArray(selectedAnswer) && selectedAnswer.includes(option)}
                onChange={() => handleMultiSelectChange(option)}
                disabled={submitted}
                className="form-checkbox h-5 w-5 text-blue-600 rounded"
              />
            ) : (
              <input
                type={inputType}
                name={`question-${question._id}`}
                value={option}
                checked={selectedAnswer === option}
                onChange={handleSingleAnswerChange}
                disabled={submitted}
                className="form-radio h-5 w-5 text-blue-600"
              />
            )}
            <span className={`text-gray-800 font-medium ${submitted && Array.isArray(correctAnswer) && correctAnswer.includes(option) ? 'text-green-600 font-bold' : ''}`}>
              {option}
            </span>
          </label>
        ))}
      </div>
    );
  };

  return (
    <div className={`p-6 border rounded-xl shadow-lg transition-colors duration-300 ${getBackgroundColor()}`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-gray-800">Question {questionNumber}</h3>
        {submitted && (
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
            {isCorrect ? 'Correct!' : 'Incorrect'}
          </span>
        )}
      </div>
      <p className="text-lg text-gray-700 mb-4">{question.questionText}</p>
      {renderOptions()}
      {submitted && correctAnswer && (
        <div className="mt-2 p-2 rounded-lg bg-gray-100 border-l-4 border-gray-400">
          <p className="font-semibold text-gray-700">Correct Answer(s):</p>
          <p className="text-gray-600">{Array.isArray(correctAnswer) ? correctAnswer.join(', ') : correctAnswer}</p>
        </div>
      )}
    </div>
  );
};

export default QuestionDisplay;
