import mongoose, { Schema, Document } from "mongoose";

// this is a sub-document that will be stored within the "quizAttempts" aray
export interface IQuizAttempt {
    quizId: mongoose.Schema.Types.ObjectId,
    score: number,
    timestamp:Date
}

// interface which represents the structure of a single progress document in the MongoDB
export interface IProgress extends Document {
    user:mongoose.Schema.Types.ObjectId,
    course: mongoose.Schema.Types.ObjectId,
    completedLessons: mongoose.Schema.Types.ObjectId[],
    quizAttempts: IQuizAttempt[]
}

// schema which defines the structure and data types for the Progress collection
const ProgressSchema: Schema = new Schema({
    // 'user" field act as a reference to the User collection
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    // "course" field is a reference to the 'Course' collection.
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    // "completedLessons" is an array of ObjectId references to the "Lesson' collection
    // and this allows us to track which lessons the user has been completed
    completedLessons: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson",
    }],
    // "quizAttempts" is an array of the IQuizAttempt subdocuments defined above.
    quizAttempts: [{
        quizId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Quiz",
            required: true,
        },
        score: {
            type: Number,
            required: true,
        },
        timestamp: {
            type: Date,
            default: Date.now,
        }
    }]
});

export default mongoose.model<IProgress>('Progress', ProgressSchema);