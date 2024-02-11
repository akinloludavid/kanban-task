import { Response, Request, NextFunction } from 'express'
import { createTaskValidation } from '../utils/validations'

export const validateCreateTask = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    createTaskValidation
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
