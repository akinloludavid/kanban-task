import { Request, Response, NextFunction } from 'express'
import { UserModel } from '../models/user'
import { IUser } from '../types'
import { verifyToken } from '../utils/auth'

export interface IRequest<T> extends Request {
    user: T
}
export const authenticateUser = async (
    req: any,
    res: Response,
    next: NextFunction,
) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('here')
        return res.status(401).json({ message: 'Unauthorized' })
    }
    const token = authHeader.split(' ')[1]
    try {
        const decodedToken = await verifyToken(token)
        console.log(decodedToken)
        const user = (await UserModel.findById({
            _id: decodedToken.userId,
        })) as IUser
        if (!user) {
            return res
                .status(401)
                .json({ message: 'Unauthorized. Invalid token' })
        }
        req.user = user
        next()
    } catch (err: any) {
        return res.status(401).json({ message: err.message })
    }
}
