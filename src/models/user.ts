import mongoose, { Document, Schema } from 'mongoose'
import jwt from 'jsonwebtoken'
import { CONFIG } from '../config/projectConfig'
export interface IUser extends Document {
    username: string
    email: string
    password: string
}

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
})

userSchema.methods.generateToken = function () {
    const token = jwt.sign(
        { id: this._id, email: this.email },
        CONFIG.JWT_SECRET_KEY,
        {
            expiresIn: '7d',
        },
    )
    return token
}
export const UserModel = mongoose.model<IUser>('User', userSchema)
