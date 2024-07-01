import { Router } from 'express';
import { addCategory, listCategories, updateCategory, deleteCategory } from '../controllers/categoryController';

const router = Router();

router.post('/add', addCategory);
router.get('/', listCategories);
router.put('/edit/:id', updateCategory);
router.delete('/delete/:id', deleteCategory);

export default router;
