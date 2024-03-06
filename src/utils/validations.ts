import Joi from 'joi'

export const userValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8).max(255),
})

export const createBoardValidation = Joi.object({
    name: Joi.string().required(),
    columns: Joi.array().items(Joi.string()),
})

export const createTaskValidation = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string().required(),
    boardId: Joi.string().required(),
    subtasks: Joi.array().items(
        Joi.object({
            subtitle: Joi.string(),
            done: Joi.bool(),
        }),
    ),
})
