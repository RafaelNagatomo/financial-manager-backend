import { PrismaClient, Transactions } from '@prisma/client';

const prisma = new PrismaClient();

export const createTransaction = async (
  user_id: string,
  transaction_type: string,
  transaction_name: string,
  transaction_amount: number,
  paid: boolean,
  category_name?: string,
  expiration_date?: Date,
  ): Promise<Transactions> => {

  const createdTrasaction = await prisma.transactions.create({
    data: {
      user_id,
      transaction_type,
      transaction_name,
      transaction_amount,
      paid,
      category_name,
      expiration_date,
    },
  });

  return createdTrasaction;
};

export const getTransactions = async (userId: string): Promise<(Transactions & { categoryExists: boolean })[]> => {
  const transactions = await prisma.transactions.findMany({
    where: {
      user_id: userId,
    },
    orderBy: {
      created_at: 'desc',
    },
    include: {
      category_exists: true,
    },
  });

  const CheckCategoryTransactions = transactions.map(transaction => ({
    ...transaction,
    categoryExists: !!transaction.category_exists,
  }));

  return CheckCategoryTransactions;
};

export const updateTransaction = async (
    transactionId: string,
    user_id: string,
    transaction_type: string,
    transaction_name: string,
    transaction_amount: number,
    paid: boolean,
    category_name?: string,
    expiration_date?: Date,
  ): Promise<Transactions | null> => {
  try {
    const updatedTransaction = await prisma.transactions.update({
      where: { id: transactionId },
      data: {
        user_id,
        transaction_type,
        transaction_name,
        transaction_amount,
        paid,
        category_name,
        expiration_date,
      },
    });

    return updatedTransaction;
  } catch (error) {
    return null;
  }
};

export const deleteTransaction = async (transactionId: string): Promise<boolean> => {
  try {
    await prisma.transactions.delete({
      where: { id: transactionId },
    });

    return true;
  } catch (error) {
    return false;
  }
};

export const disconnect = async (): Promise<void> => {
  await prisma.$disconnect();
};