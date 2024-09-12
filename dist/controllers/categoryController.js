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
exports.disconnect = exports.deleteCategory = exports.updateCategory = exports.listCategories = exports.addCategory = void 0;
const categoryService = __importStar(require("../services/categoryService"));
const addCategory = async (req, res) => {
    try {
        const { user_id, category_name, max_amount } = req.body;
        const newCategory = await categoryService.createCategory(user_id, category_name, max_amount);
        res.status(201).json(newCategory);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.addCategory = addCategory;
const listCategories = async (req, res) => {
    try {
        const user_id = req.query.userId;
        const allCategories = await categoryService.getAllCategories(user_id);
        res.status(200).json(allCategories);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.listCategories = listCategories;
const updateCategory = async (req, res) => {
    const categoryId = parseInt(req.params.id, 10);
    const { category_name, max_amount } = req.body;
    try {
        const updatedCategory = await categoryService.updateCategory(categoryId, category_name, max_amount);
        if (updatedCategory) {
            res.status(200).json(updatedCategory);
        }
        else {
            res.status(404).json({ error: 'Categoria não encontrada ou não pôde ser atualizada.' });
        }
    }
    catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar categoria' });
    }
};
exports.updateCategory = updateCategory;
const deleteCategory = async (req, res) => {
    const categoryId = parseInt(req.params.id, 10);
    try {
        await categoryService.deleteCategory(categoryId);
        res.status(200).send({ message: 'Categoria deletada com sucesso.' });
    }
    catch (error) {
        res.status(400).json({ error: 'Erro ao deletar categoria' });
    }
};
exports.deleteCategory = deleteCategory;
const disconnect = async () => {
    await categoryService.disconnect();
};
exports.disconnect = disconnect;
