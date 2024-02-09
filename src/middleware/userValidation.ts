import { Request, Response, NextFunction } from 'express'
import { userValidation } from '../utils/validations'

export const validateUser = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    userValidation
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
