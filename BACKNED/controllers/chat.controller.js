import apiError from "../utils/apiError.utils.js";
import asyncHandeler from "../utils/asynHandler.utils.js";
import apiResponse from "../utils/apiResponse.utils.js";
import Chat from "../models/chats.model.js";
import User from "../models/user.model.js"
import sendOtp from "../utils/otpVerificaton.utils.js"

const addChat = asyncHandeler(async(req,res) => {
    // Enter Phone number
    // serch user by phone number if exit 
    // create a new document of chat
    const {mobileNumber} = req.body
    const isExit = await User.findOne({phoneNum : mobileNumber})
    if(!isExit){
        sendOtp(mobileNumber,"Your friend is Inviting You to Join <<Our web Link>>")
        throw new apiError(400,"User does not exit")
    }

    let isAlreadyChat = await Chat.findOne({
        members: { $all: [req.user._id, isExit._id] },
    });

    if (isAlreadyChat){
        throw new apiError(400,"Chat already exit between you two")
    }
    const newChat = await Chat.create({
        members: [req.user._id, isExit._id],
    });

    if(!newChat){
        throw new apiError(500,"Unable to create chat")
    }

    return res
    .status(201)
    .json(
        new apiResponse(
            "Chat created successfully",
            201,
            newChat,
        )
    );
})

const getAllConnections = asyncHandeler(async(req,res) => {
    const allConnections = await Chat.find({
        members: { $in: [req.user._id] },
    }).populate("members","userName fullName avatar phoneNum mail description");

    if(!allConnections){
        throw new apiError(500,"Unable to fetch connections")
    }   

    return res
    .status(200)
    .json(
        new apiResponse(
            "Connections fetched successfully",
            200,
            allConnections,
        )
    );  
})

export {
    addChat,
    getAllConnections
}
