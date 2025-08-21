import { Request, Response } from 'express';
import Quiz, { IQuiz } from '../models/Quiz';
import Lesson from '../models/Lesson';

export const createQuiz = async (req: Request, res: Response) => {
  try {
    const { lessonId, questions } =req.body;
    if (!lessonId || !questions || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: 'Lesson ID and an array of questions are required.' });
    }

    const existingQuiz = await Quiz.findOne({ lesson: lessonId });
    if (existingQuiz) {
      return res.status(409).json({ message: 'A quiz already exists for this lesson.' });
    }

    const newQuiz = new Quiz({
      lesson: lessonId,
      questions: questions,
    });

    await newQuiz.save();

    res.status(201).json({ message: 'Quiz created successfully.', quiz: newQuiz });
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export const getQuizByLessonId = async (req: Request, res: Response) => {
  try {
    const { lessonId } = req.params;

    if (!lessonId) {
      return res.status(400).json({ message: 'Lesson ID is required.' });
    }

    const quiz = await Quiz.findOne({ lesson: lessonId });

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found for this lesson.' });
    }

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

export const submitQuiz = async (req: Request, res: Response) => {
  try {
    const { quizId } = req.params;
    const { answers } = req.body;

    if (!quizId || !answers || !Array.isArray(answers)) {
      return res.status(400).json({ message: 'Quiz ID and answers are required.' });
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found.' });
    }

    let score = 0;
    const totalQuestions = quiz.questions.length;

    // Map quiz questions to make lookup easier.
    const quizQuestionsMap = new Map();
    quiz.questions.forEach((q) => quizQuestionsMap.set(q._id.toString(), q));

    // Calculate score based on submitted answers.
    answers.forEach((userAnswer: any) => {
      const question = quizQuestionsMap.get(userAnswer.questionId);
      if (question && question.correctAnswer === userAnswer.selectedOption) {
        score++;
      }
    });

    const percentage = (score / totalQuestions) * 100;

    res.status(200).json({
      message: 'Quiz submitted successfully.',
      score,
      totalQuestions,
      percentage,
    });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

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

    res.status(200).json(quiz);
  } catch (error) {
    console.error('Error getting quiz by ID:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};