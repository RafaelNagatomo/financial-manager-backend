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
exports.disconnect = exports.deleteGoal = exports.updateGoal = exports.listGoals = exports.addGoal = void 0;
const goalService = __importStar(require("../services/goalService"));
const addGoal = async (req, res) => {
    try {
        const { user_id, goal_name, goal_description, goal_amount, amount_raised } = req.body;
        let goal_date;
        if (goal_date === '')
            return goal_date = null;
        const goal_image = req.file ? req.file.filename : undefined;
        const newGoal = await goalService.createGoal(user_id, goal_name, goal_description, goal_amount, amount_raised, goal_image, goal_date);
        res.status(201).json(newGoal);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.addGoal = addGoal;
const listGoals = async (req, res) => {
    try {
        const user_id = req.query.userId;
        const allGoals = await goalService.getAllGoals(user_id);
        res.status(200).json(allGoals);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.listGoals = listGoals;
const updateGoal = async (req, res) => {
    const goalId = parseInt(req.params.id);
    const { user_id, goal_name, goal_description, goal_amount, amount_raised, goal_date } = req.body;
    const formattedGoalDate = goal_date === '' ? null : goal_date;
    const goal_image = req.file ? req.file.filename : undefined;
    try {
        const updatedGoal = await goalService.updateGoal(goalId, user_id, goal_name, goal_description, goal_amount, amount_raised, goal_image, formattedGoalDate);
        if (updatedGoal) {
            res.status(200).json(updatedGoal);
        }
        else {
            res.status(404).json({ error: 'Goal não encontrada ou não pôde ser atualizada.' });
        }
    }
    catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar Goal' });
    }
};
exports.updateGoal = updateGoal;
const deleteGoal = async (req, res) => {
    const goalId = parseInt(req.params.id, 10);
    try {
        await goalService.deleteGoal(goalId);
        res.status(200).send({ message: 'Meta deletada com sucesso.' });
    }
    catch (err) {
        if (err.message === 'P2025') {
            res.status(404).json({ err: err.message, error: 'Meta não encontrada' });
        }
        else {
            res.status(500).json({ error: 'Erro ao deletar meta' });
        }
    }
};
exports.deleteGoal = deleteGoal;
const disconnect = async () => {
    await goalService.disconnect();
};
exports.disconnect = disconnect;
