import mongoose, { Schema, Document } from 'mongoose';

export interface IQuestion {
    _id: mongoose.Types.ObjectId;
    questionText: string;
    questionType: string;
    options: string[]; // array of all answers
    correctAnswer: string;
}

// declare the main interface for the Quiz doc
export interface IQuiz extends Document {
  lesson: mongoose.Schema.Types.ObjectId;
  questions: IQuestion[];
}

const QuizSchema: Schema = new Schema({
    // "lesson" field is a reference to the 'Lesson' collection
    lesson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson",
        required: true,
        unique: true, // a lesson should only have one quiz associated with it
    },
    questions: [
      {
        questionText: {
          type: String,
          required: true,
        },
        questionType: {
          type: String,
          required: true,
        },
        options: {
          type: [String],
          required: true,
        },
        correctAnswer: {
          type: String,
          required: true,
        },
      },
    ],
});

export default mongoose.model<IQuiz>("Quiz", QuizSchema);