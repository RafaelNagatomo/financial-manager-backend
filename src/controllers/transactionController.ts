import { Request, Response } from 'express';
import { createTransaction, getTransactions } from '../services/transactionService';

export const addTransaction = async (req: Request, res: Response) => {
  try {
    const { transaction_type, transaction_name, transaction_tag, transaction_amount, expiration_date, paid, user_id, category_id } = req.body;
    const newTransaction = await createTransaction(transaction_type, transaction_name, transaction_tag, transaction_amount, new Date(expiration_date), paid, user_id, category_id);
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
