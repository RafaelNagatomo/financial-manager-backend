import { Router } from 'express';
import { addGoal, listGoals, updateGoal, deleteGoal } from '../controllers/goalController';

const router = Router();

router.post('/add', addGoal);
router.get('/', listGoals);
router.put('/edit/:id', updateGoal);
router.delete('/delete/:id', deleteGoal);

export default router;
