"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitQuiz = exports.markLessonAsCompleted = exports.getLessonContent = void 0;
const Lesson_1 = __importDefault(require("../models/Lesson"));
const Quiz_1 = __importDefault(require("../models/Quiz"));
const Progress_1 = __importDefault(require("../models/Progress"));
// fetches a single lesson by its id, including its own quiz
const getLessonContent = async (req, res) => {
    try {
        const { lessonId } = req.params;
        const lesson = await Lesson_1.default.findById(lessonId).populate("quiz");
        if (!lesson) {
            return res.status(404).json({ message: "Lesson not found." });
        }
        res.status(200).json(lesson);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};
exports.getLessonContent = getLessonContent;
// update the user's progress to mark a lesson as completed
const markLessonAsCompleted = async (req, res) => {
    try {
        const { lessonId, courseId } = req.body;
        const userId = req.user.id;
        // find the user's progress for that particular course
        let progress = await Progress_1.default.findOne({ user: userId, course: courseId });
        if (!progress) {
            // if no progress document exists, create a new progree doc
            progress = new Progress_1.default({
                user: userId,
                course: courseId,
                completedLessons: [lessonId],
                quizAttempts: [],
            });
        }
        else {
            // if this lesson is not already in the completed list we add it
            if (!progress.completedLessons.includes(lessonId)) {
                progress.completedLessons.push(lessonId);
            }
        }
        await progress.save();
        res.status(200).json({ message: "Lesson marked as completed successfully!", progress });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to update your progress!", err });
    }
};
exports.markLessonAsCompleted = markLessonAsCompleted;
// handles the submission of the quiz
// it calculates the score and saves the attempt to the user's progress document
const submitQuiz = async (req, res) => {
    try {
        const { quizId, answers, courseId } = req.body;
        const userId = req.user.id;
        // fetch the quiz to validate the answers
        const quiz = await Quiz_1.default.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }
        let score = 0;
        // go through answers and callucates the score
        answers.forEach((answer) => {
            const question = quiz.questions.find(q => q._id.toString() === answer.questionId);
            if (question && question.correctAnswer === answer.submittedAnswer) {
                score++;
            }
        });
        // find and update the user's progress.
        const progress = await Progress_1.default.findOneAndUpdate({ user: userId, course: courseId }, { $push: { quizAttempts: { quizId, score, timestamp: new Date() } } }, { new: true, upsert: true } //craete new if no one found
        );
        res.status(200).json({ message: 'Quiz submitted successfully.', score, progress });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};
exports.submitQuiz = submitQuiz;
//# sourceMappingURL=PlayerController.js.map