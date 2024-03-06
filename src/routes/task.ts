import { Router } from 'express'
import {
    createNewTask,
    deleteTask,
    getAllTasks,
    getTaskById,
    updateTask,
} from '../controllers/task'
import { authenticateUser } from '../middleware/auth'
import { validateCreateTask } from '../middleware/task'

const router = Router()

router.get('/tasks/:boardId', authenticateUser, getAllTasks)
router.get('/task/:boardId/:taskId', authenticateUser, getTaskById)

router.post('/tasks', authenticateUser, validateCreateTask, createNewTask)
router.put(
    '/task/update/:taskId',
    authenticateUser,
    validateCreateTask,
    updateTask,
)
router.delete('/task/delete/:boardId/:taskId', authenticateUser, deleteTask)

export default router
