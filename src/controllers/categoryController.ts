import { Request, Response } from 'express';
import { createCategory, getCategories } from '../services/categoryService';

export const addCategory = async (req: Request, res: Response) => {
  try {
    const { category_name, max_amount } = req.body;
    const newCategory = await createCategory(category_name, max_amount);
    res.status(201).json(newCategory);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const listCategories = async (req: Request, res: Response) => {
  try {
    const categories = await getCategories();
    res.status(200).json(categories);
  } catch (error: any) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
