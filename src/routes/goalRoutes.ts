import { Router } from 'express';
import { addGoal, listGoals, updateGoal, deleteGoal } from '../controllers/goalController';
import upload from '../config/multerConfig'

const router = Router();

router.post('/add', upload.single('goal_image'), addGoal);
router.get('/', listGoals);
router.put('/edit/:id', upload.single('goal_image'), updateGoal);
router.delete('/delete/:id', deleteGoal);

export default router;
