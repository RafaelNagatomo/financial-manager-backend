import { Router } from 'express';
import { addCategory, listCategories, updateCategory, deleteCategory } from '../controllers/categoryController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.use(authMiddleware)

router.post('/add', addCategory);
router.get('/', listCategories);
router.put('/edit/:id', updateCategory);
router.delete('/delete/:id', deleteCategory);

export default router;
