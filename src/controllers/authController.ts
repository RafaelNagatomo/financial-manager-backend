import { Request, Response } from 'express';
import { registerService, loginService, editUserService } from '../services/authService';

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

export const editUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { firstName, lastName, email } = req.body;
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }
  try {
    const editedUser = await editUserService(userId, firstName, lastName, email);
    res.status(200).json(editedUser);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getProfile = (req: Request, res: Response) => {
  res.status(200).json(req.user);
};