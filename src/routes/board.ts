import { Router } from 'express'
import { createBoard } from '../controllers/board'
import { authenticateUser } from '../middleware/auth'
import { validateCreateBoardPayload } from '../middleware/board'

const router = Router()

router.post(
    '/boards',
    authenticateUser,
    validateCreateBoardPayload,
    createBoard,
)

export default router
