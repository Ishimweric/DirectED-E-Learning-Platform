import { Request } from 'express';
import { IUser } from './index';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}