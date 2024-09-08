import { Router } from 'express'
import { register, login, getProfile } from '../controllers/authController'
import { authMiddleware } from '../middlewares/authMiddleware'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/profile', authMiddleware, getProfile)

export default router