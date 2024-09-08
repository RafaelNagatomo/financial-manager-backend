import { NextFunction, Request, Response } from "express";
import { getProfileService } from '../services/authService';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'noTokenProvided' });
      }
      const token = authHeader.split(' ')[1];
      const user = await getProfileService(token);

      if (!user) {
        return res.status(401).json({ error: 'invalidOrExpiredToken' });
      }
      const { password: _, ...loggedUser } = user
  
      req.user = loggedUser;
      next();
    } catch (error: any) {
      res.status(401).json({ error: error.message || 'Unauthorized' });
    }
}