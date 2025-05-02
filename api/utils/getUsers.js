import User from "../models/user.model.js"

export const getUserFromDB = async  (userId) =>{
    return await User.findById(userId)
}