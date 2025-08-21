import { Request, Response } from 'express';
import Lesson from '../models/Lesson';
import Quiz from '../models/Quiz';
import Progress from '../models/Progress';
import Course from '../models/Course'; // Assuming you have a Course model

// fetches a single lesson by its id, including its own quiz
export const getLessonContent = async (req:Request, res:Response) => {
  try {
    const { lessonId } = req.params;
    const lesson = await Lesson.findById(lessonId).populate("quiz");

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found." });
    }

    res.status(200).json(lesson);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error });
  }
};

// update the user's progress to mark a lesson as completed
export const markLessonAsCompleted = async (req: Request, res: Response) => {
  try {
    const { lessonId, courseId } = req.body;
    const userId =(req as any).user.id;

    // find the user's progress for that particular course
    let progress = await Progress.findOne({ user: userId, course: courseId });

    if (!progress) {
      // if no progress document exists, create a new progree doc
      progress = new Progress({
        user: userId,
        course: courseId,
        completedLessons: [lessonId],
        quizAttempts: [],
      });
    }else{
      // if this lesson is not already in the completed list we add it
      if (!progress.completedLessons.includes(lessonId)) {
        progress.completedLessons.push(lessonId);
      }
    }

    await progress.save();
    res.status(200).json({ message: "Lesson marked as completed successfully!", progress });
  } catch (err:any) {
    res.status(500).json({ message: "Failed to update your progress!", err});
  }
};

export const submitQuiz = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { quizId, answers, courseId } = req.body;
    const userId = (req as any).user.id;

    // Fetch the quiz to validate the answers
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    let score = 0;

    // Go through answers and calculate the score
    answers.forEach((answer: any) => {
      const question = quiz.questions.find(
        (q) => q._id?.toString() === answer.questionId
      );
      if (question && question.correctAnswer === answer.submittedAnswer) {
        score++;
      }
    });

    // Find and update the user's progress.
    const progress = await Progress.findOneAndUpdate(
      { user: userId, course: courseId },
      { $push: { quizAttempts: { quizId, score, timestamp: new Date() } } },
      { new: true, upsert: true } // Upsert creates a new document if one is not found
    );

    return res.status(200).json({
      message: "Quiz submitted successfully.",
      score,
      progress,
    });
  } catch (error) {
    console.error("Error submitting quiz:", error);
    return res.status(500).json({ message: "Failed to submit quiz!", error });
  }
};

// ** NEW FUNCTIONS ADDED HERE **

// Controller function to get a user's course progress.
// This function should calculate overall progress based on completed lessons.
export const getCourseProgress = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    const userId = (req as any).user.id;

    // Fetch the course to get the total number of lessons
    const course = await Course.findById(courseId).populate('lessons');
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    const totalLessons = course.lessons.length;
    
    // Fetch the user's progress for this course
    const progress = await Progress.findOne({ user: userId, course: courseId });
    const completedLessons = progress ? progress.completedLessons.length : 0;

    // Calculate the percentage
    const completionPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

    res.status(200).json({
      courseId,
      totalLessons,
      completedLessons,
      completionPercentage: completionPercentage.toFixed(2), // Format to 2 decimal places
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch course progress.", error });
  }
};

// Controller function to fetch a quiz for a specific lesson.
// This needs to retrieve the quiz data from the database.
export const getQuizByLessonId = async (req: Request, res: Response) => {
  try {
    const { lessonId } = req.params;
    const quiz = await Quiz.findOne({ lesson: lessonId });

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found for this lesson." });
    }

    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch quiz.", error });
  }
};

// Controller function for an instructor to create a quiz.
// This function needs to save the new quiz to the database.
export const createQuiz = async (req: Request, res: Response) => {
  try {
    const quizData = req.body;
    const newQuiz = new Quiz(quizData);
    await newQuiz.save();
    res.status(201).json({ message: "Quiz created successfully!", quiz: newQuiz });
  } catch (error) {
    res.status(500).json({ message: "Failed to create quiz!", error });
  }
};

// Controller function to get a user's quiz attempts.
// This function needs to fetch past attempts for a specific quiz from the database.
export const getQuizAttempts = async (req: Request, res: Response) => {
  try {
    const { quizId } = req.params;
    const userId = (req as any).user.id;

    // Find the user's progress document and filter for quiz attempts
    const progress = await Progress.findOne({ user: userId });
    
    if (!progress) {
      return res.status(404).json({ message: "Progress not found for this user." });
    }

    // Filter attempts for the specific quiz
    const quizAttempts = progress.quizAttempts.filter(attempt => 
      attempt.quizId.toString() === quizId
    );

    res.status(200).json({ message: `Fetched quiz attempts for quiz ID: ${quizId}`, quizAttempts });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch quiz attempts.", error });
  }
};
