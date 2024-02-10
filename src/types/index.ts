import { Document } from 'mongoose'
export interface IUser extends Document {
    username: string
    email: string
    password: string
}

export interface IBoard extends Document {
    name: string
    columns: string[]
}
