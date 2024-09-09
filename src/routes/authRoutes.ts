import { Router } from 'express'
import { register, login, getProfile, editUser, changePassword } from '../controllers/authController'
import { authMiddleware } from '../middlewares/authMiddleware'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/profile', authMiddleware, getProfile)
router.put('/editUser/:id', authMiddleware, editUser)
router.put('/changePassword/:id', authMiddleware, changePassword)

export default router