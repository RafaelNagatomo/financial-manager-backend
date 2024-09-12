"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnect = exports.deleteTransaction = exports.updateTransaction = exports.listTransactions = exports.addTransaction = void 0;
const transactionService = __importStar(require("../services/transactionService"));
const addTransaction = async (req, res) => {
    try {
        const { user_id, transaction_type, transaction_name, transaction_amount, paid, category_name, expiration_date, } = req.body;
        const newTransaction = await transactionService.createTransaction(user_id, transaction_type, transaction_name, transaction_amount, paid, category_name, expiration_date);
        res.status(201).json(newTransaction);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.addTransaction = addTransaction;
const listTransactions = async (req, res) => {
    try {
        const user_id = req.query.userId;
        const transactions = await transactionService.getTransactions(user_id);
        res.status(200).json(transactions);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.listTransactions = listTransactions;
const updateTransaction = async (req, res) => {
    const transactionId = req.params.id;
    const { user_id, transaction_type, transaction_name, transaction_amount, paid, category_name, expiration_date, } = req.body;
    try {
        const updatedTransaction = await transactionService.updateTransaction(transactionId, user_id, transaction_type, transaction_name, transaction_amount, paid, category_name, expiration_date);
        if (updatedTransaction) {
            res.status(200).json(updatedTransaction);
        }
        else {
            res.status(404).json({ error: 'Transação não encontrada ou não pôde ser atualizada.' });
        }
    }
    catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar Transação' });
    }
};
exports.updateTransaction = updateTransaction;
const deleteTransaction = async (req, res) => {
    const transactionId = req.params.id;
    try {
        await transactionService.deleteTransaction(transactionId);
        res.status(200).send({ message: 'Transação deletada com sucesso.' });
    }
    catch (error) {
        res.status(400).json({ error: 'Erro ao deletar Transação' });
    }
};
exports.deleteTransaction = deleteTransaction;
const disconnect = async () => {
    await transactionService.disconnect();
};
exports.disconnect = disconnect;
