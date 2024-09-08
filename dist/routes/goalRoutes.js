"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const goalController_1 = require("../controllers/goalController");
const multerConfig_1 = __importDefault(require("../config/multerConfig"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.use(authMiddleware_1.authMiddleware);
router.post('/add', multerConfig_1.default.single('goal_image'), goalController_1.addGoal);
router.get('/', goalController_1.listGoals);
router.put('/edit/:id', multerConfig_1.default.single('goal_image'), goalController_1.updateGoal);
router.delete('/delete/:id', goalController_1.deleteGoal);
exports.default = router;
