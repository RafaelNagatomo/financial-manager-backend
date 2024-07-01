import { PrismaClient, Transactions } from '@prisma/client';

const prisma = new PrismaClient();

export const createTransaction = async (
  transaction_type: string,
  transaction_name: string,
  transaction_tag: string,
  transaction_amount: number,
  expiration_date: Date,
  paid: boolean,
  user_id: string,
  category_id: string
  ): Promise<Transactions> => {

  const trasaction = await prisma.transactions.create({
    data: {
      transaction_type,
      transaction_name,
      transaction_tag,
      transaction_amount,
      expiration_date,
      paid,
      user_id,
      category_id
    },
  });

  return trasaction;
};

export const getTransactions = async (): Promise<Transactions[]> => {
  return prisma.transactions.findMany();
};
