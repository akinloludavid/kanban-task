import { Document } from 'mongoose'
export interface IUser extends Document {
    username: string
    email: string
    password: string
    firstname?: string
    lastname?: string
    role?: string
}

export interface IBoard extends Document {
    name: string
    columns: string[]
}

export interface ITasks extends Document {
    title: string
    description: string
    status: string
    subtask: string[]
    assigneed?: string
}

export type IRequest = Request & {
    user: IUser
}
