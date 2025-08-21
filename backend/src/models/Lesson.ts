import mongoose, { Schema, Document } from 'mongoose';

export interface ILesson extends Document {
  title: string;
  description:string;
  videoUrl: string;
  quiz: mongoose.Schema.Types.ObjectId; // this is the referene to the quiz doc
}

const LessonSchema:Schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
    },
    // this allows us to easily find the quiz for a given lesson
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
        required: false,
    }
});

export default mongoose.model<ILesson>("Lesson", LessonSchema);