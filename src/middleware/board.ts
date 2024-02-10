import { Request, Response, NextFunction } from 'express'
import { createBoardValidation } from '../utils/validations'

export const validateCreateBoardPayload = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    createBoardValidation
        .validateAsync(req.body, { abortEarly: false })
        .then(_value => {
            next()
        })
        .catch(error => {
            return res.status(400).json({
                message: error.message,
                status: 'error',
            })
        })
}
