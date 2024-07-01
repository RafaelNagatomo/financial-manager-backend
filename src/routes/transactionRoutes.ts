import { Router } from 'express';
import { addTransaction, listTransactions } from '../controllers/transactionController';

const router = Router();

router.post('/add', addTransaction);
router.get('/', listTransactions);

export default router;
