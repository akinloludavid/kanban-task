import { Request, Response } from 'express'
import { BoardModel } from '../models/board'
export const createBoard = async (req: Request, res: Response) => {
    try {
        const newBoard = await BoardModel.create(req.body)
        return res.status(201).json({
            board: newBoard,
            status: 'success',
            message: 'Board created successfully',
        })
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            status: 'error',
        })
    }
}
