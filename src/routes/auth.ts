import { Router } from 'express'
import { createAccount } from '../controllers/auth'
import { validateUser } from '../middleware/userValidation'

const router = Router()

router.post('/auth/signup', validateUser, createAccount)

export default router
