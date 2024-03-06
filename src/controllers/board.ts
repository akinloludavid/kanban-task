import { Request, Response } from 'express'
import { BoardModel } from '../models/board'
import { returnErrorResponse, returnSuccessResponse } from '../utils/responses'

export const createBoard = async (req: any, res: Response) => {
    try {
        const boardPayload = {
            ...req.body,
            author: req.user._id,
        }
        const newBoard = await BoardModel.create(boardPayload)

        return returnSuccessResponse(
            res,
            201,
            'Board created successfully',
            newBoard,
        )
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            status: 'error',
        })
    }
}

export const getAllBoards = async (req: any, res: Response) => {
    try {
        const boards = await BoardModel.find({})
            .where({
                author: req?.user?._id,
            })
            .populate('author', 'username email')
            .exec()
        return returnSuccessResponse(res, 200, '', boards)
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            status: 'error',
        })
    }
}
export const getBoardById = async (req: Request, res: Response) => {
    try {
        const board = await BoardModel.findById(req.params.id)
            .populate('author', 'username email')
            .exec()
        return returnSuccessResponse(res, 200, '', board)
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            status: 'error',
        })
    }
}

export const deleteBoard = async (req: Request, res: Response) => {
    const boardId = req.params.id
    try {
        const board = await BoardModel.findById(boardId)
        if (!board) {
            return returnErrorResponse(res, 404, `Board not found`)
        }
        await BoardModel.deleteOne({ _id: boardId })

        return returnSuccessResponse(res, 204, 'Board deleted')
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            status: 'error',
        })
    }
}

export const updateBoard = async (req: any, res: Response) => {
    const { name, columns } = req.body
    const boardId = req.params.id

    try {
        const updatedBoard = await BoardModel.findByIdAndUpdate(
            boardId,
            {
                name,
                columns,
                author: req.user._id,
            },
            { new: true },
        )
        return returnSuccessResponse(res, 200, 'Board updated', updatedBoard)
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            status: 'error',
        })
    }
}