"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transactionController_1 = require("../controllers/transactionController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.use(authMiddleware_1.authMiddleware);
router.post('/add', transactionController_1.addTransaction);
router.get('/', transactionController_1.listTransactions);
router.put('/edit/:id', transactionController_1.updateTransaction);
router.delete('/delete/:id', transactionController_1.deleteTransaction);
exports.default = router;
