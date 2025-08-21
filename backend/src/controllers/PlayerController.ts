import { Request, Response } from 'express';
import Lesson from '../models/Lesson';
import Quiz from '../models/Quiz';
import Progress from '../models/Progress';

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