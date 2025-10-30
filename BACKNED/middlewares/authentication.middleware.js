import apiError from "../utils/apiError.utils.js";
import asyncHandeler from "../utils/asynHandler.utils.js";
import apiResponse from "../utils/apiResponse.utils.js";
import User from "../models/user.model.js";

const authentication = asyncHandeler(async(req,res,next) => {
    try {
        const userId = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    
        if (!userId){
            throw new apiError(401,"user must be loggedIn")
        }
    
        const user = User.findById(userId?._id)
    
        if (!user) {
            throw new apiError(501, "no user found")
        }
    
        req.user = user
        next()
    } catch (error) {
        throw new apiError(401,"Authentication Problem")
    }


})

export default authentication