import { Router } from 'express';
import { addCategory, listCategories } from '../controllers/categoryController';

const router = Router();

router.post('/add', addCategory);
router.get('/', listCategories);

export default router;
