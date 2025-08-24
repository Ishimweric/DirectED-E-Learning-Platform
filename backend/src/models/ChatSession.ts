import mongoose, { Schema } from 'mongoose';
import { IChatSession, IChatMessage } from '../types';

const chatMessageSchema = new Schema<IChatMessage>({
  content: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'assistant'],
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const chatSessionSchema = new Schema<IChatSession>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    context: {
      course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
      },
      lesson: {
        type: Schema.Types.ObjectId,
        ref: 'Lesson',
      },
    },
    messages: [chatMessageSchema],
  },
  {
    timestamps: true,
  }
);

const ChatSession = mongoose.model<IChatSession>('ChatSession', chatSessionSchema);
export default ChatSession;