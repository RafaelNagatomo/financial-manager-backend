import { Request, Response } from 'express';
import * as goalService from '../services/goalService';

export const addGoal = async (req: Request, res: Response) => {
  try {
    const {
        user_id,
        goal_name,
        goal_description,
        goal_amount,
        amount_raised
    } = req.body;

    let goal_date
    if(goal_date === '') return goal_date = null

    const goal_image = req.file ? req.file.filename : undefined;

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
  const goalId = parseInt(req.params.id);
  const {
    user_id,
    goal_name,
    goal_description,
    goal_amount,
    amount_raised,
    goal_date
  } = req.body;

  const formattedGoalDate = goal_date === '' ? null : goal_date;

  const goal_image = req.file ? req.file.filename : undefined;

  try {
    const updatedGoal = await goalService.updateGoal(
      goalId,
      user_id,
      goal_name,
      goal_description,
      goal_amount,
      amount_raised,
      goal_image,
      formattedGoalDate
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
    res.status(200).send({ message: 'Meta deletada com sucesso.' });
  } catch (err: any) {
    if (err.message === 'P2025') {
      res.status(404).json({ err: err.message, error: 'Meta não encontrada' });
    } else {
      res.status(500).json({ error: 'Erro ao deletar meta' });
    }
  }
};

export const disconnect = async (): Promise<void> => {
  await goalService.disconnect();
};
