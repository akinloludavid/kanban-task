import mongoose, { Schema } from 'mongoose'
import { IUser } from '../types'

const userSchema = new Schema(
    {
        firstname: { type: String },
        lastname: { type: String },
        role: { type: String },
        username: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
    },
    { timestamps: true },
)

export const UserModel = mongoose.model<IUser>('User', userSchema)
