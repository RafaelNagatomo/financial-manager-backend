import { Prisma, PrismaClient, Categories } from '@prisma/client';

const prisma = new PrismaClient();

export const createCategory = async (
  user_id: string,
  category_name: string,
  max_amount?: number
): Promise<Categories | string> => {
  try {
    const createdCategory = await prisma.categories.create({
      data: {
        user_id,
        category_name,
        max_amount,
      },
    });

    return createdCategory;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002' && (error.meta as any)?.target?.includes('category_name')) {
        return 'CATEGORY_EXISTS';
      }
    }
    throw error;
  }
};

export const getAllCategories = async (): Promise<Categories[]> => {
  const categoriesToExclude = ['income'];
  const categories = await prisma.categories.findMany();

  return categories.filter(category => !categoriesToExclude.includes(category.category_name))
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
