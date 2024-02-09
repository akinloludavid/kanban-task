// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express'
import { IUser, UserModel } from '../models/user'
import { verifyToken } from '../utils/auth'

export interface IRequest<T> extends Request {
    user: T
}
export const authenticateUser = async (
    req: IRequest<IUser>,
    res: Response,
    next: NextFunction,
) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    const token = authHeader.split(' ')[1]
    try {
        const decodedToken = await verifyToken(token)
        const user = (await UserModel.findById({
            _id: decodedToken.id,
        })) as IUser
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
        req.user = user
        next()
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
}
