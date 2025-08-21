import { Request } from 'express';
import { Types } from 'mongoose';

// declare that we are extending the 'express' module.
declare module 'express' {
  interface CustomUser {
    _id: Types.ObjectId;
  }

  // extend the Request interface to include our custom 'user' property.
  export interface Request {
    user?: CustomUser;
  }
}