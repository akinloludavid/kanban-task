import { Router } from 'express'
import { createAccount, loginToAccount } from '../controllers/auth'
import { validateUser } from '../middleware/userValidation'

const router = Router()

router.post('/auth/signup', validateUser, createAccount)
router.post('/auth/login', validateUser, loginToAccount)


export default router
