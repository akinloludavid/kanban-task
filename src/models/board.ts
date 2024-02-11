import mongoose, { Schema } from 'mongoose'
import { IBoard } from '../types'

const boardSchema = new Schema(
    {
        name: { type: String, required: true },
        columns: [
            {
                type: String,
            },
        ],
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true },
)

export const BoardModel = mongoose.model<IBoard>('Board', boardSchema)
