import { Router } from 'express';
import { addTransaction, listTransactions, updateTransaction, deleteTransaction } from '../controllers/transactionController';

const router = Router();

router.post('/add', addTransaction);
router.get('/', listTransactions);
router.put('/edit/:id', updateTransaction);
router.delete('/delete/:id', deleteTransaction);

export default router;
