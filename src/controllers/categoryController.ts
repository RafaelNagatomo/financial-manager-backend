import { Request, Response } from 'express';
import * as categoryService from '../services/categoryService';

export const addCategory = async (req: Request, res: Response) => {
  try {
    const { user_id, category_name, max_amount } = req.body;
    const newCategory = await categoryService.createCategory(user_id, category_name, max_amount);
    res.status(201).json(newCategory);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const listCategories = async (req: Request, res: Response) => {
  try {
    const user_id = req.query.userId as string
    const allCategories = await categoryService.getAllCategories(user_id);
    res.status(200).json(allCategories);
  } catch (error: any) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateCategory = async (req: Request, res: Response): Promise<void> => {
  const categoryId = parseInt(req.params.id, 10);
  const { category_name, max_amount } = req.body;
  try {
    const updatedCategory = await categoryService.updateCategory(categoryId, category_name, max_amount);
    if (updatedCategory) {
      res.status(200).json(updatedCategory);
    } else {
      res.status(404).json({ error: 'Categoria não encontrada ou não pôde ser atualizada.' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar categoria' });
  }
};

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  const categoryId = parseInt(req.params.id, 10);
  try {
    await categoryService.deleteCategory(categoryId);
    res.status(200).send({ message: 'Categoria deletada com sucesso.' });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao deletar categoria' });
  }
};

export const disconnect = async (): Promise<void> => {
  await categoryService.disconnect();
};
