// src/controllers/quizController.ts

import { Request, Response } from 'express';
import Quiz, { IQuiz } from '../models/Quiz';
import Lesson from '../models/Lesson';

/**
 * @desc Creates a new quiz for a lesson.
 * @route POST /api/quizzes
 * @access Private (Instructor)
 */
export const createQuiz = async (req: Request, res: Response) => {
  try {
    const { lessonId, questions } = req.body;
    if (!lessonId || !questions || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: 'Lesson ID and an array of questions are required.' });
    }

    // Check if a quiz already exists for this lesson to prevent duplicates.
    const existingQuiz = await Quiz.findOne({ lesson: lessonId });
    if (existingQuiz) {
      return res.status(409).json({ message: 'A quiz already exists for this lesson.' });
    }

    const newQuiz = new Quiz({
      lesson: lessonId,
      questions: questions,
    });

    // Save the new quiz to the database.
    await newQuiz.save();

    // Respond with a success message and the new quiz data.
    res.status(201).json({ message: 'Quiz created successfully.', quiz: newQuiz });
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

/**
 * @desc Fetches a quiz for a specific lesson.
 * @route GET /api/quizzes/:lessonId
 * @access Private
 */
export const getQuizByLessonId = async (req: Request, res: Response) => {
  try {
    const { lessonId } = req.params;

    if (!lessonId) {
      return res.status(400).json({ message: 'Lesson ID is required.' });
    }

    // Find the quiz linked to the lesson ID.
    const quiz = await Quiz.findOne({ lesson: lessonId });

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found for this lesson.' });
    }

    // Create a new object to send back to the client,
    // explicitly omitting the `correctAnswer` field for security.
    const quizResponse = {
      _id: quiz._id,
      lesson: quiz.lesson,
      questions: quiz.questions.map((q) => ({
        questionText: q.questionText,
        options: q.options,
        _id: q._id,
      })),
      createdAt: quiz.createdAt,
      updatedAt: quiz.updatedAt,
    };

    res.status(200).json(quizResponse);
  } catch (error) {
    console.error('Error getting quiz:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

/**
 * @desc Fetches a quiz by its ID.
 * @route GET /api/quizzes/:quizId
 * @access Private
 */
export const getQuizById = async (req: Request, res: Response) => {
  try {
    const { quizId } = req.params;

    if (!quizId) {
      return res.status(400).json({ message: 'Quiz ID is required.' });
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found.' });
    }

    // Respond with the full quiz object.
    res.status(200).json(quiz);
  } catch (error) {
    console.error('Error getting quiz by ID:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
