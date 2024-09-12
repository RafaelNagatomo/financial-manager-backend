"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnect = exports.deleteGoal = exports.updateGoal = exports.getAllGoals = exports.createGoal = void 0;
const client_1 = require("@prisma/client");
const decimal_js_1 = __importDefault(require("decimal.js"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const prisma = new client_1.PrismaClient();
const createGoal = async (user_id, goal_name, goal_description, goal_amount, amount_raised, goal_image, goal_date) => {
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
    });
    return createdGoal;
};
exports.createGoal = createGoal;
const getAllGoals = async (userId) => {
    const goals = await prisma.goals.findMany({
        where: {
            user_id: userId,
        },
        orderBy: {
            created_at: 'asc'
        }
    });
    return goals;
};
exports.getAllGoals = getAllGoals;
const updateGoal = async (goalId, user_id, goal_name, goal_description, goal_amount, amount_raised, goal_image, goal_date) => {
    try {
        const currentGoal = await prisma.goals.findUnique({
            where: { id: goalId },
        });
        if (!currentGoal) {
            throw new Error('Goal não encontrado.');
        }
        if (goal_image && currentGoal.goal_image) {
            const oldImagePath = path_1.default.join('uploads', currentGoal.goal_image);
            if (fs_1.default.existsSync(oldImagePath)) {
                fs_1.default.unlinkSync(oldImagePath);
            }
        }
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
        const amountRaised = transactions.reduce((sum, transaction) => sum.plus(new decimal_js_1.default(transaction.transaction_amount || 0)), new decimal_js_1.default(0)).toNumber();
        await prisma.goals.update({
            where: { id: goalId },
            data: { amount_raised: amountRaised },
        });
        return updatedGoal;
    }
    catch (error) {
        console.error('Erro ao atualizar goal:', error);
        return null;
    }
};
exports.updateGoal = updateGoal;
const deleteGoal = async (goalId) => {
    try {
        const goal = await prisma.goals.findUnique({
            where: { id: goalId },
            select: { goal_image: true }
        });
        if (!goal) {
            throw new Error('Meta não encontrada');
        }
        if (goal.goal_image) {
            const imagePath = path_1.default.join('uploads', goal.goal_image);
            fs_1.default.unlink(imagePath, (err) => {
                if (err) {
                    console.error('Erro ao deletar a imagem:', err);
                }
            });
        }
        await prisma.goals.delete({
            where: { id: goalId },
        });
    }
    catch (error) {
        if (error.code === 'P2025') {
            throw new Error('P2025');
        }
        throw new Error('Erro ao deletar meta');
    }
};
exports.deleteGoal = deleteGoal;
const disconnect = async () => {
    await prisma.$disconnect();
};
exports.disconnect = disconnect;
