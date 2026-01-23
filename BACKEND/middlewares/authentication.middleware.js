import apiError from "../utils/apiError.utils.js";
import asyncHandeler from "../utils/asynHandler.utils.js";
import apiResponse from "../utils/apiResponse.utils.js";
import User from "../models/user.model.js";

const authentication = asyncHandeler(async(req,res,next) => {
    try {
        // console.log("Cookies: ", req);
        const userId = req.cookies?.currentUserId || req.heasders?.authorization?.split(" ")[1];
        // console.log("authentication middleware called");
        // console.log("userId: ", userId);
        // console.log("req.body:", req.body);
        if (!userId){
            throw new apiError(401,"user must be loggedIn")
        }
    
        const user = await User.findById(userId)
        // console.log("user: ", user);
        if (!user) {
            throw new apiError(501, "no user found")
        }
    
        req.user = user
        next()
    } catch (error) {
        throw new apiError(401,"User need To be loggedIn")
    }


})

export default authentication