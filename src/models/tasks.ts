import mongoose, { Schema } from 'mongoose'
import { ITasks } from '../types'

const taskSchema = new Schema(
    {
        title: { type: String, required: true },
        description: {
            type: String,
        },
        status: {
            type: String,
        },
        subtasks: [
            {
                done: Boolean,
                subtitle: String,
            },
        ],
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        board: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Board',
        },
    },
    { timestamps: true },
)

export const TaskModel = mongoose.model<ITasks>('Tasks', taskSchema)
