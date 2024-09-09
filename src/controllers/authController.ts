import { Request, Response } from 'express';
import { registerService, loginService, editUserService, changePasswordService } from '../services/authService';

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

export const changePassword = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.id;
  const { currentPassword, newPassword } = req.body;

  if (!userId) {
    res.status(400).json({ error: 'User ID is required' });
    return;
  }
  if (!currentPassword || !newPassword) {
    res.status(400).json({ error: 'Both current and new passwords are required' });
    return;
  }

  try {
    const editedPass = await changePasswordService(userId, currentPassword, newPassword);
    if (!editedPass) {
      res.status(400).json({ error: 'Failed to change password. Please check your current password.' });
      return;
    }
    res.status(200).json({ message: 'Password changed successfully', user: editedPass });
  } catch (error: any) {
    console.error('Error changing password:', error);
    res.status(500).json({ error: error.message || 'Failed to change password.' });
  }
};

export const getProfile = (req: Request, res: Response) => {
  res.status(200).json(req.user);
};