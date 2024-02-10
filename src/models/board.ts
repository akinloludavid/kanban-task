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
        // author:{type: }
    },
    { timestamps: true },
)

export const BoardModel = mongoose.model<IBoard>('Board', boardSchema)
