import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types';

export const generateToken = (payload: JwtPayload): string => {
  return jwt.sign(
    payload, 
    process.env.JWT_SECRET as jwt.Secret, // Cast to jwt.Secret
    {
      expiresIn: process.env.JWT_EXPIRE as string | number, // Cast to string | number
    } as jwt.SignOptions // Explicitly type the options object
  );
};