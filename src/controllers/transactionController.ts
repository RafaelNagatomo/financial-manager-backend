import { Request, Response } from 'express';
import * as transactionService from '../services/transactionService';

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

    const newTransaction = await transactionService.createTransaction(
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
    const transactions = await transactionService.getTransactions();
    res.status(200).json(transactions);
  } catch (error: any) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateTransaction = async (req: Request, res: Response): Promise<void> => {
  const transactionId = req.params.id;
  const {
    user_id,
    category_name,
    transaction_type,
    transaction_name,
    transaction_amount,
    paid,
    expiration_date, } = req.body;
  try {
    const updatedTransaction = await transactionService.updateTransaction(
      transactionId,
      user_id,
      category_name,
      transaction_type,
      transaction_name,
      transaction_amount,
      paid,
      expiration_date,
    );
    if (updatedTransaction) {
      res.status(200).json(updatedTransaction);
    } else {
      res.status(404).json({ error: 'Transação não encontrada ou não pôde ser atualizada.' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar Transação' });
  }
};

export const deleteTransaction = async (req: Request, res: Response): Promise<void> => {
  const transactionId = req.params.id;
  try {
    await transactionService.deleteTransaction(transactionId);
    res.status(200).send({ message: 'Transação deletada com sucesso.' });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao deletar Transação' });
  }
};

export const disconnect = async (): Promise<void> => {
  await transactionService.disconnect();
};
