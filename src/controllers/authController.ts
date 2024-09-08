import { Request, Response } from 'express';
import { registerService, loginService, getProfileService } from '../services/authService';

export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const newUser = await registerService(firstName, lastName, email, password);
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { token } = await loginService(email, password);

    res.json({ token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getProfile = (req: Request, res: Response) => {
  res.status(200).json(req.user);
};