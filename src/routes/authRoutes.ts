import { Router } from 'express'
import { register, login, getProfile, editUser } from '../controllers/authController'
import { authMiddleware } from '../middlewares/authMiddleware'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/profile', authMiddleware, getProfile)
router.put('/editUser/:id', authMiddleware, editUser)

export default router