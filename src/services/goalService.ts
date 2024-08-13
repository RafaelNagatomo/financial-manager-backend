import { PrismaClient, Goals } from '@prisma/client';
import Decimal from 'decimal.js';

const prisma = new PrismaClient();

export const createGoal = async (
  user_id: string,
  goal_name: string,
  goal_description: string | null,
  goal_amount: number,
  amount_raised?: number,
  goal_image?: string,
  goal_date?: Date
): Promise<Goals> => {
  const createdGoal = await prisma.goals.create({
    data: {
      user_id,
      goal_name,
      goal_description,
      goal_amount,
      amount_raised,
      goal_image,
      goal_date
    }
  })

  return createdGoal
}

export const getAllGoals = async (): Promise<Goals[]> => {
  const goals = await prisma.goals.findMany({
    orderBy: {
      created_at: 'asc'
    }
  });
  return goals
};

export const updateGoal = async (
  goalId: number,
  user_id: string,
  goal_name: string,
  goal_description?: string | null,
  goal_amount?: number,
  amount_raised?: number,
  goal_image?: string,
  goal_date?: Date
): Promise<Goals | null> => {
  try {
    const updatedGoal = await prisma.goals.update({
      where: { id: goalId },
      data: {
        user_id,
        goal_name,
        goal_description,
        goal_amount,
        amount_raised,
        goal_image,
        goal_date
      },
    });

    const transactions = await prisma.transactions.findMany({
      where: {
        category_name: 'goals',
        transaction_name: goal_name,
      },
    });

    const amountRaised = transactions.reduce((sum, transaction) => 
      sum.plus(new Decimal(transaction.transaction_amount || 0)), 
      new Decimal(0)
    ).toNumber();

    await prisma.goals.update({
      where: { id: goalId },
      data: { amount_raised: amountRaised },
    });

    return updatedGoal;
  } catch (error) {
    console.error('Erro ao atualizar goal:', error);
    return null;
  }
};

export const deleteGoal = async (goalId: number): Promise<void> => {
  try {
    await prisma.goals.delete({
      where: { id: goalId },
    });
  } catch (error: any) {
    if (error.code === 'P2025') {
      throw new Error('P2025');
    }
    throw new Error('Erro ao deletar meta');
  }
};

export const disconnect = async (): Promise<void> => {
  await prisma.$disconnect();
};