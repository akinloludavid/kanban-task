import { UserModel } from '../../models/user'

export const getByUserById = async (id: string) => {
    try {
        const user = await UserModel.findById(id)
        return user
    } catch (error: any) {
        throw new Error(error.message)
    }
}
export const getEmailFromUserCollection = async (email: string) => {
    try {
        const user = await UserModel.findOne({
            email,
        })
        return user
    } catch (error: any) {
        throw new Error(error.message)
    }
}
