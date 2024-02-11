import { Request, Response } from 'express'
import { TaskModel } from '../models/tasks'
import { returnErrorResponse, returnSuccessResponse } from '../utils/responses'

export const createNewTask = async (req: any, res: Response) => {
    try {
        const taskPayload = {
            ...req.body,
            author: req.user._id,
            board: req.params.boardId,
        }
        const newBoard = await TaskModel.create(taskPayload)
        return returnSuccessResponse(
            res,
            201,
            'Task created successfully',
            newBoard,
        )
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            status: 'error',
        })
    }
}

export const getAllTasks = async (req: Request, res: Response) => {
    try {
        const allTasks = await TaskModel.where({
            board: req.params.boardId,
        })
            .populate('board', 'name columns')
            .populate('author', 'username email')
        return returnSuccessResponse(res, 200, '', allTasks)
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            status: 'error',
        })
    }
}

export const getTaskById = async (req: Request, res: Response) => {
    try {
        const { taskId, boardId } = req.params
        const task = await TaskModel.findOne()
            .where('_id', taskId)
            .where('board', boardId)
        if (!task) {
            return returnErrorResponse(res, 404, 'Task not found')
        }
        return returnSuccessResponse(res, 200, 'Success', task)
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            status: 'error',
        })
    }
}

export const deleteTask = async (req: any, res: Response) => {
    const { boardId, taskId } = req.params

    try {
        const task = await TaskModel.findOne()
            .where('_id', taskId)
            .where('board', boardId)
        if (!task) {
            return returnErrorResponse(res, 404, 'Task not found')
        }
        const authorId = task.get('author').toString()
        if (authorId !== req.user._id.toString()) {
            return returnErrorResponse(
                res,
                403,
                'You are not authorized to delete this task',
            )
        }
        await TaskModel.findByIdAndDelete(task._id)
        return returnSuccessResponse(res, 204, 'Task deleted')
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            status: 'error',
        })
    }
}

export const updateTask = async (req: any, res: Response) => {
    const { boardId, taskId } = req.params
    try {
        const task = await TaskModel.findOne()
            .where('_id', taskId)
            .where('board', boardId)
        if (!task) {
            return returnErrorResponse(res, 404, 'Task not found')
        }

        const updatedTask = await TaskModel.findByIdAndUpdate(
            { _id: taskId },
            req.body,
            { new: true },
        )

        return returnSuccessResponse(res, 200, 'Task updated', updatedTask)
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            status: 'error',
        })
    }
}
