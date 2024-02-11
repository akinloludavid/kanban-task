import { Response } from 'express'

export const returnErrorResponse = (
    res: Response,
    statusCode: number,
    message: string,
) => {
    res.status(statusCode).json({
        status: 'error',
        message,
    })
}

export const returnSuccessResponse = (
    res: Response,
    statusCode: number,
    message?: string,
    data?: any,
) => {
    res.status(statusCode).json({
        status: 'success',
        message,
        data,
    })
}
