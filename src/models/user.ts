import mongoose, { Schema } from 'mongoose'
import { IUser } from '../types'

const userSchema = new Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
    },
    { timestamps: true },
)

export const UserModel = mongoose.model<IUser>('User', userSchema)
