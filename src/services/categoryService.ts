import { PrismaClient, Categories } from '@prisma/client';

const prisma = new PrismaClient();

export const createCategory = async (
  user_id: string,
  category_name: string,
  max_amount?: number
): Promise<Categories> => {

  const createdCategory = await prisma.categories.create({
    data: {
      user_id,
      category_name,
      max_amount
    },
  });

  return createdCategory;
};

export const getAllCategories = async (): Promise<Categories[]> => {
  return prisma.categories.findMany();
};

export const updateCategory = async (
  categoryId: number,
  category_name: string,
  max_amount?: number
): Promise<Categories | null> => {
  try {
    const updatedCategory = await prisma.categories.update({
      where: { id: categoryId },
      data: {
        category_name,
        max_amount,
      },
    });

    return updatedCategory;
  } catch (error) {
    return null;
  }
};

export const deleteCategory = async (categoryId: number): Promise<boolean> => {
  try {
    await prisma.categories.delete({
      where: { id: categoryId },
    });

    return true;
  } catch (error) {
    return false;
  }
};

export const disconnect = async (): Promise<void> => {
  await prisma.$disconnect();
};
