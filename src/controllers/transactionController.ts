import { Request, Response } from 'express';
import { createTransaction, getTransactions } from '../services/transactionService';

export const addTransaction = async (req: Request, res: Response) => {
  try {
    const {
      user_id,
      category_name,
      transaction_type,
      transaction_name,
      transaction_amount,
      paid,
      expiration_date,
    } = req.body;

    const newTransaction = await createTransaction(
      user_id,
      category_name,
      transaction_type,
      transaction_name,
      transaction_amount,
      paid,
      expiration_date,
    );
    
    res.status(201).json(newTransaction);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const listTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await getTransactions();
    res.status(200).json(transactions);
  } catch (error: any) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
