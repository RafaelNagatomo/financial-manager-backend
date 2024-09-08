"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnect = exports.deleteCategory = exports.updateCategory = exports.getAllCategories = exports.createCategory = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createCategory = async (user_id, category_name, max_amount) => {
    try {
        const createdCategory = await prisma.categories.create({
            data: {
                user_id,
                category_name,
                max_amount,
            },
        });
        return createdCategory;
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002' && error.meta?.target?.includes('category_name')) {
                return 'CATEGORY_EXISTS';
            }
        }
        throw error;
    }
};
exports.createCategory = createCategory;
const getAllCategories = async () => {
    const categoriesToExclude = ['income'];
    const categories = await prisma.categories.findMany();
    return categories.filter(category => !categoriesToExclude.includes(category.category_name));
};
exports.getAllCategories = getAllCategories;
const updateCategory = async (categoryId, category_name, max_amount) => {
    try {
        const updatedCategory = await prisma.categories.update({
            where: { id: categoryId },
            data: {
                category_name,
                max_amount,
            },
        });
        return updatedCategory;
    }
    catch (error) {
        return null;
    }
};
exports.updateCategory = updateCategory;
const deleteCategory = async (categoryId) => {
    try {
        await prisma.categories.delete({
            where: { id: categoryId },
        });
        return true;
    }
    catch (error) {
        return false;
    }
};
exports.deleteCategory = deleteCategory;
const disconnect = async () => {
    await prisma.$disconnect();
};
exports.disconnect = disconnect;
