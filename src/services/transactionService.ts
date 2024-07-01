import { PrismaClient, Transactions } from '@prisma/client';

const prisma = new PrismaClient();

export const createTransaction = async (
  user_id: string,
  category_name: string,
  transaction_type: string,
  transaction_name: string,
  transaction_amount: number,
  paid: boolean,
  expiration_date?: Date,
  ): Promise<Transactions> => {

  const trasaction = await prisma.transactions.create({
    data: {
      user_id,
      category_name,
      transaction_type,
      transaction_name,
      transaction_amount,
      paid,
      expiration_date,
    },
  });

  return trasaction;
};

export const getTransactions = async (): Promise<Transactions[]> => {
  return prisma.transactions.findMany();
};
