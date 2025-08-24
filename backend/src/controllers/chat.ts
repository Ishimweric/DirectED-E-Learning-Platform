import { Request, Response } from 'express';
import OpenAI from "openai";
import ChatSession from '../models/ChatSession';
import Course from '../models/Course';
import Lesson from '../models/Lesson';
import { AuthRequest } from '../middleware/auth';
import { ApiResponse } from '../types';
import { ChatCompletionMessageParam } from 'openai/resources/chat';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const sendMessage = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { message, courseId, lessonId } = req.body;
    const userId = req.user._id;

    // Get or create chat session
    let chatSession = await ChatSession.findOne({ user: userId });
    
    if (!chatSession) {
      chatSession = new ChatSession({
        user: userId,
        messages: [],
      });
    }

    // Add user message to session
    chatSession.messages.push({
      content: message,
      role: 'user',
      timestamp: new Date(),
    });

    // Set context if provided
    if (courseId) {
      chatSession.context = { course: courseId };
      if (lessonId) {
        chatSession.context.lesson = lessonId;
      }
    }

    // Prepare context for AI
    let context = '';
    if (chatSession.context?.course) {
      const course = await Course.findById(chatSession.context.course)
        .select('title description');
      
      if (course) {
        context += `Course: ${course.title}. ${course.description}. `;
        
        if (chatSession.context.lesson) {
          const lesson = await Lesson.findById(chatSession.context.lesson)
            .select('title description');
          
          if (lesson) {
            context += `Current lesson: ${lesson.title}. ${lesson.description}. `;
          }
        }
      }
    }

    // Prepare messages for OpenAI
    const messages:ChatCompletionMessageParam[]  = [
      {
        role: 'system',
        content: `You are an educational assistant for an e-learning platform called DirectEd. 
        ${context}
        Be helpful, supportive, and educational. If the user asks about course content, 
        provide accurate information based on the context. If you don't know something, 
        admit it rather than making up information.`,
      },
      ...chatSession.messages.slice(-10).map(msg => ({
        role: msg.role,
        content: msg.content,
      })),
    ];

    // Get response from OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      max_tokens: 500,
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0].message?.content || 
    "I'm sorry, I couldn't generate a response.";

    // Add AI response to session
    chatSession.messages.push({
      content: aiResponse,
      role: 'assistant',
      timestamp: new Date(),
    });

    // Save session
    await chatSession.save();

    const response: ApiResponse = {
      success: true,
      message: 'Message sent successfully',
      data: {
        response: aiResponse,
        sessionId: chatSession._id,
      },
    };

    res.status(200).json(response);
  } catch (error:any) {
    console.error(error);
    
    // Handle OpenAI API errors
    if (error.response?.status === 401) {
      res.status(500).json({ 
        success: false, 
        message: 'AI service configuration error' 
      });
    } else if (error.response?.status === 429) {
      res.status(429).json({ 
        success: false, 
        message: 'AI service rate limit exceeded. Please try again later.' 
      });
    } else {
      res.status(500).json({ 
        success: false, 
        message: 'Failed to get response from AI assistant' 
      });
    }
  }
};

export const getChatHistory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user._id;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const chatSession = await ChatSession.findOne({ user: userId });

    if (!chatSession) {
      const response: ApiResponse = {
        success: true,
        message: 'No chat history found',
        data: {
          messages: [],
          pagination: {
            page,
            limit,
            total: 0,
            pages: 0,
          },
        },
      };
      
      res.status(200).json(response);
      return;
    }

    // Get paginated messages
    const totalMessages = chatSession.messages.length;
    const messages = chatSession.messages
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(skip, skip + limit);

    const response: ApiResponse = {
      success: true,
      message: 'Chat history fetched successfully',
      data: {
        messages,
        pagination: {
          page,
          limit,
          total: totalMessages,
          pages: Math.ceil(totalMessages / limit),
        },
      },
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};