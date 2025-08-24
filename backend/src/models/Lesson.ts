import mongoose, { Schema } from 'mongoose';
import { ILesson } from '../types';

const lessonSchema = new Schema<ILesson>(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
      default: 'https://example.com/demo-video.mp4', // Hardcoded demo video
    },
    duration: {
      type: Number,
      required: true,
      min: 0,
    },
    order: {
      type: Number,
      required: true,
      min: 0,
    },
    attachments: [{
      name: String,
      url: String,
    }],
    isPreview: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Lesson = mongoose.model<ILesson>('Lesson', lessonSchema);
export default Lesson;