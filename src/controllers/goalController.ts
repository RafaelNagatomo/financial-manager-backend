import { Request, Response } from 'express';
import * as goalService from '../services/goalService';

export const addGoal = async (req: Request, res: Response) => {
  try {
    const {
        user_id,
        goal_name,
        goal_description,
        goal_amount,
        amount_raised,
        goal_image,
        goal_date
    } = req.body;
    const newGoal = await goalService.createGoal(
      user_id,
      goal_name,
      goal_description,
      goal_amount,
      amount_raised,
      goal_image,
      goal_date
    );
    res.status(201).json(newGoal);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const listGoals = async (req: Request, res: Response) => {
  try {
    const allGoals = await goalService.getAllGoals();
    res.status(200).json(allGoals);
  } catch (error: any) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateGoal = async (req: Request, res: Response): Promise<void> => {
  const goalId = parseInt(req.params.id, 10);
  const {
    user_id,
    goal_name,
    goal_description,
    goal_amount,
    amount_raised,
    goal_image,
    goal_date
  } = req.body;
  try {
    const updatedGoal = await goalService.updateGoal(
      goalId,
      user_id,
      goal_name,
      goal_description,
      goal_amount,
      amount_raised,
      goal_image,
      goal_date
    );
    if (updatedGoal) {
      res.status(200).json(updatedGoal);
    } else {
      res.status(404).json({ error: 'Goal não encontrada ou não pôde ser atualizada.' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar Goal' });
  }
};

export const deleteGoal = async (req: Request, res: Response): Promise<void> => {
  const goalId = parseInt(req.params.id, 10);
  try {
    await goalService.deleteGoal(goalId);
    res.status(200).send({ message: 'Goal deletada com sucesso.' });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao deletar Goal' });
  }
  console.log(goalId)
};

export const disconnect = async (): Promise<void> => {
  await goalService.disconnect();
};
