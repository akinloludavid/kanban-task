// src/utils/auth.ts
import jwt from 'jsonwebtoken'
import { CONFIG } from '../config/projectConfig'
import bcrypt from 'bcryptjs'
import { IUser } from '../types'
const JWT_SECRET_KEY = CONFIG.JWT_SECRET_KEY

export const generateToken = (user: IUser): string => {
    return jwt.sign({ userId: user._id }, JWT_SECRET_KEY, { expiresIn: '24h' })
}

export const verifyToken = (token: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                reject(err)
            } else {
                resolve(decoded)
            }
        })
    })
}

export const encryptPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(12)
    password = await bcrypt.hash(password, salt)
    return password
}

export const comparePassword = async (
    sentPassword: string,
    hashedPassword: string,
) => {
    return await bcrypt.compare(sentPassword, hashedPassword)
}
