import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Quiz from '../models/Quiz';
import QuizAttempt from '../models/QuizAttempt';
import Course from '../models/Course';
import Lesson from '../models/Lesson';
import { AuthRequest } from '../middleware/auth';
import { ApiResponse } from '../types';

export const getQuiz = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    
    if (!quiz) {
      res.status(404).json({ success: false, message: 'Quiz not found' });
      return;
    }

    // Check if user has access to this quiz
    let hasAccess = false;
    
    if (quiz.course) {
      // Course quiz - check if user is enrolled
      hasAccess = req.user.enrolledCourses.some(
        (course: any) => course.toString() === quiz.course.toString()
      );
    } else if (quiz.lesson) {
      // Lesson quiz - check if user has access to the lesson
      const lesson = await Lesson.findById(quiz.lesson);
      if (lesson) {
        hasAccess = req.user.enrolledCourses.some(
          (course: any) => course.toString() === lesson.course.toString()
        );
      }
    }

    if (!hasAccess && req.user.role !== 'instructor') {
      res.status(403).json({ success: false, message: 'Not authorized to access this quiz' });
      return;
    }

    // For students, don't send correct answers
    let quizData: any = { ...quiz.toObject() };
    if (req.user.role === 'student') {
      quizData.questions = quizData.questions.map((question: any) => {
        const { correctAnswer, ...questionWithoutAnswer } = question;
        return questionWithoutAnswer;
      });
    }

    const response: ApiResponse = {
      success: true,
      message: 'Quiz fetched successfully',
      data: quizData,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const submitQuiz = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ success: false, message: 'Invalid data', errors: errors.array() });
      return;
    }

    const { answers, timeSpent } = req.body;
    const quizId = req.params.id;

    const quiz = await Quiz.findById(quizId);
    
    if (!quiz) {
      res.status(404).json({ success: false, message: 'Quiz not found' });
      return;
    }

    // Check if user has access to this quiz
    let hasAccess = false;
    
    if (quiz.course) {
      // Course quiz - check if user is enrolled
      hasAccess = req.user.enrolledCourses.some(
        (course: any) => course.toString() === quiz.course.toString()
      );
    } else if (quiz.lesson) {
      // Lesson quiz - check if user has access to the lesson
      const lesson = await Lesson.findById(quiz.lesson);
      if (lesson) {
        hasAccess = req.user.enrolledCourses.some(
          (course: any) => course.toString() === lesson.course.toString()
        );
      }
    }

    if (!hasAccess) {
      res.status(403).json({ success: false, message: 'Not authorized to take this quiz' });
      return;
    }

    // Check if user has reached max attempts
    const previousAttempts = await QuizAttempt.countDocuments({
      student: req.user._id,
      quiz: quizId,
    });

    if (previousAttempts >= quiz.maxAttempts) {
      res.status(400).json({ success: false, message: 'Maximum attempts reached for this quiz' });
      return;
    }

    // Calculate score
    let score = 0;
    let totalPoints = 0;
    const evaluatedAnswers = [];

    for (const answer of answers) {
  // Use find() instead of id() method
  const question = quiz.questions.find(
    (q: any) => q._id.toString() === answer.question.toString()
  );
  
  if (question) {
    totalPoints += question.points;
    const isCorrect = question.correctAnswer === answer.answer;
    if (isCorrect) {
      score += question.points;
    }
    evaluatedAnswers.push({
      question: answer.question,
      answer: answer.answer,
      isCorrect,
    });
  }
}

    const percentageScore = (score / totalPoints) * 100;
    const isPassed = percentageScore >= quiz.passingScore;

    // Create quiz attempt
    const quizAttempt = new QuizAttempt({
      student: req.user._id,
      quiz: quizId,
      answers: evaluatedAnswers,
      score: percentageScore,
      timeSpent,
    });

    await quizAttempt.save();

    const response: ApiResponse = {
      success: true,
      message: isPassed ? 'Quiz passed successfully' : 'Quiz failed',
      data: {
        attempt: quizAttempt,
        passed: isPassed,
        correctAnswers: quiz.questions.map(q => ({
          question: q._id,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
        })),
      },
    };

    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getQuizAttempts = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const quizId = req.params.id;
    const userId = req.user._id;

    const quiz = await Quiz.findById(quizId);
    
    if (!quiz) {
      res.status(404).json({ success: false, message: 'Quiz not found' });
      return;
    }

    // Check if user is the instructor or the student who took the quiz
    let hasAccess = false;
    
    if (quiz.course) {
      const course = await Course.findById(quiz.course);
      hasAccess = course?.instructor.toString() === userId.toString();
    } else if (quiz.lesson) {
      const lesson = await Lesson.findById(quiz.lesson);
      if (lesson) {
        const course = await Course.findById(lesson.course);
        hasAccess = course?.instructor.toString() === userId.toString();
      }
    }

    if (!hasAccess && req.user.role !== 'instructor') {
      // For students, only show their own attempts
      const attempts = await QuizAttempt.find({
        student: userId,
        quiz: quizId,
      }).sort({ attemptedAt: -1 });

      const response: ApiResponse = {
        success: true,
        message: 'Quiz attempts fetched successfully',
        data: attempts,
      };

      res.status(200).json(response);
      return;
    }

    // For instructors, show all attempts for this quiz
    const attempts = await QuizAttempt.find({ quiz: quizId })
      .populate('student', 'firstName lastName email')
      .sort({ attemptedAt: -1 });

    const response: ApiResponse = {
      success: true,
      message: 'Quiz attempts fetched successfully',
      data: attempts,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const createQuiz = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ 
        success: false, 
        message: 'Invalid quiz data', 
        errors: errors.array() 
      });
      return;
    }

    const { title, description, questions, timeLimit, passingScore, maxAttempts, lessonId, courseId } = req.body;

    // Validate that either lessonId or courseId is provided, but not both
    if (!lessonId && !courseId) {
      res.status(400).json({
        success: false,
        message: 'Either lessonId or courseId must be provided'
      });
      return;
    }

    if (lessonId && courseId) {
      res.status(400).json({
        success: false,
        message: 'Only one of lessonId or courseId can be provided, not both'
      });
      return;
    }

    // If lessonId is provided, verify the lesson exists and belongs to the instructor
    if (lessonId) {
      const lesson = await Lesson.findById(lessonId);
      if (!lesson) {
        res.status(404).json({
          success: false,
          message: 'Lesson not found'
        });
        return;
      }

      const course = await Course.findById(lesson.course);
      if (!course || course.instructor.toString() !== req.user._id.toString()) {
        res.status(403).json({
          success: false,
          message: 'Not authorized to create quiz for this lesson'
        });
        return;
      }
    }

    // If courseId is provided, verify the course exists and belongs to the instructor
    if (courseId) {
      const course = await Course.findById(courseId);
      if (!course) {
        res.status(404).json({
          success: false,
          message: 'Course not found'
        });
        return;
      }

      if (course.instructor.toString() !== req.user._id.toString()) {
        res.status(403).json({
          success: false,
          message: 'Not authorized to create quiz for this course'
        });
        return;
      }
    }

    // Create the quiz
    const quiz = new Quiz({
      title,
      description,
      questions,
      timeLimit,
      passingScore,
      maxAttempts,
      lesson: lessonId || null,
      course: courseId || null
    });

    await quiz.save();

    // Add quiz to course if it's a course quiz
    if (courseId) {
      await Course.findByIdAndUpdate(
        courseId,
        { $push: { quizzes: quiz._id } }
      );
    }

    // Add quiz to lesson if it's a lesson quiz
    if (lessonId) {
      await Lesson.findByIdAndUpdate(
        lessonId,
        { quiz: quiz._id }
      );
    }

    const response: ApiResponse = {
      success: true,
      message: 'Quiz created successfully',
      data: quiz
    };

    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while creating quiz' 
    });
  }
};