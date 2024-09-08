"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnect = exports.deleteTransaction = exports.updateTransaction = exports.getTransactions = exports.createTransaction = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createTransaction = async (user_id, transaction_type, transaction_name, transaction_amount, paid, category_name, expiration_date) => {
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
exports.createTransaction = createTransaction;
const getTransactions = async () => {
    const transactions = await prisma.transactions.findMany({
        orderBy: {
            created_at: 'desc',
        },
        include: {
            category_exists: true,
        },
    });
    const CheckCategorytransactions = transactions.map(transaction => ({
        ...transaction,
        categoryExists: !!transaction.category_exists,
    }));
    return CheckCategorytransactions;
};
exports.getTransactions = getTransactions;
const updateTransaction = async (transactionId, user_id, transaction_type, transaction_name, transaction_amount, paid, category_name, expiration_date) => {
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
    }
    catch (error) {
        return null;
    }
};
exports.updateTransaction = updateTransaction;
const deleteTransaction = async (transactionId) => {
    try {
        await prisma.transactions.delete({
            where: { id: transactionId },
        });
        return true;
    }
    catch (error) {
        return false;
    }
};
exports.deleteTransaction = deleteTransaction;
const disconnect = async () => {
    await prisma.$disconnect();
};
exports.disconnect = disconnect;
