import { PrismaClient, Categories } from '@prisma/client';

const prisma = new PrismaClient();

export const createCategory = async (
  category_name: string,
  max_amount: number
): Promise<Categories> => {
  const category = await prisma.categories.create({
    data: {
      category_name,
      max_amount,
    },
  });

  return category;
};

export const getCategories = async (): Promise<Categories[]> => {
  return prisma.categories.findMany();
};
