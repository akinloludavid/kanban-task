import Joi from 'joi'

export const userValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8).max(255),
})
