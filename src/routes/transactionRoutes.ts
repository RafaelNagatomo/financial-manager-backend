import { Router } from 'express';
import { addTransaction, listTransactions, updateTransaction, deleteTransaction } from '../controllers/transactionController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.use(authMiddleware)

router.post('/add', addTransaction);
router.get('/', listTransactions);
router.put('/edit/:id', updateTransaction);
router.delete('/delete/:id', deleteTransaction);

export default router;
