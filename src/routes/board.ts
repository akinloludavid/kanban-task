import { Router } from 'express'
import {
    createBoard,
    deleteBoard,
    getAllBoards,
    getBoardById,
    updateBoard,
} from '../controllers/board'
import { authenticateUser } from '../middleware/auth'
import { validateCreateBoardPayload } from '../middleware/board'

const router = Router()

router.get('/boards', authenticateUser, getAllBoards)
router.get('/boards/:id', authenticateUser, getBoardById)

router.post(
    '/boards',
    authenticateUser,
    validateCreateBoardPayload,
    createBoard,
)
router.put(
    '/boards/:id',
    authenticateUser,
    validateCreateBoardPayload,
    updateBoard,
)
router.delete('/boards/:id', authenticateUser, deleteBoard)

export default router
