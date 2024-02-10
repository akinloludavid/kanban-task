import { Request, Response } from 'express'
import { getEmailFromUserCollection } from '../database/connections/user'
import { UserModel } from '../models/user'
import { comparePassword, encryptPassword, generateToken } from '../utils/auth'

export const createAccount = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const username = email.split('@')[0]
        const user = await getEmailFromUserCollection(email)
        if (user) {
            return res.status(400).json({
                status: 'error',
                message: `Email: ${email} is already used`,
            })
        }
        let newUser = new UserModel({
            email,
            password,
            username,
        })
        newUser.password = await encryptPassword(newUser.password)
        await UserModel.create(newUser)
        const token = generateToken(newUser)
        return res.status(201).json({
            status: 'success',
            token,
            user: newUser,
        })
    } catch (error: any) {
        return res.status(500).json({
            status: 'error',
            message: error.message,
        })
    }
}

export const loginToAccount = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const user = await getEmailFromUserCollection(email)
        if (!user) {
            return res.status(400).json({
                message: 'Email is not registered to an account.',
                status: 'error',
            })
        }
        const isPasswordValid = await comparePassword(password, user.password)
        if (!isPasswordValid) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid password or email',
            })
        }
        const token = generateToken(user)
        return res.status(201).json({
            token,
            user,
            status: 'success',
        })
    } catch (error: any) {
        return res.status(500).json({
            status: 'error',
            message: error.message,
        })
    }
}