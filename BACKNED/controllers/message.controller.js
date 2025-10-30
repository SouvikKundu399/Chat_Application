import apiError from "../utils/apiError.utils.js";
import asyncHandeler from "../utils/asynHandler.utils.js";
import apiResponse from "../utils/apiResponse.utils.js";
import Message from "../models/message.model.js";

const sendMsg = asyncHandeler(async(req,res) => {
    const {chatID} = req.params
    const {msg} = req.body
    if(!chatID || ! msg){
        throw new apiError(401,"ChatID or msg is missing")
    }

    const newMessage = Message.create({
        chatId : chatID,
        senderId : req.user?._id,
        message : msg
    },
    {
        new : true
    })
    if(!newMessage){
        throw new apiError(500,"Sending Message is unsuccessful")
    }

    return res
    .status(200)
    .json(
        new apiResponse(
            200,
            "Message sent successfully",
            newMessage,
            req.originalUrl
        )
    );
})

const getMsg = asyncHandeler(async(req,res) => {
    const {chatId} = req.params
    if(!chatId){
        throw new apiError(501,"Chat ID was not found")
    }
    const allMsg = await Message.find({chatId})

    if(!allMsg){
        throw new apiError(400,"No MSG found")
    }

    return res
    .status(200)
    .json(
        new apiResponse(
            200,
            "All Messages fetched successfully",
            allMsg.sort((a,b) => a.createdAt - b.createdAt),
            req.originalUrl
        )
    );
})

const deleteMsg = asyncHandeler(async(req,res) => {
    const {msgID : chatId} = req.params
    if(!chatId){
        throw new apiError(501,"Chat ID was not found")
    }
    const deletedMsg = await Message.deleteOne({chatId})
    if(!deletedMsg){
        throw new apiError(500,"Message deletion unsuccessful")
    }
    return res
    .status(200)
    .json(
        new apiResponse(
            200,
            "Message deleted successfully",
            deletedMsg,
            req.originalUrl
        )
    );
})

const editMsg = asyncHandeler(async(req,res) => {
    const {msgID : chatId} = req.params
    const {newMsg} = req.body
    if(!chatId || !newMsg){
        throw new apiError(501,"Chat ID or newMsg was not found")
    }
    const updatedMsg = await Message.findByIdAndUpdate(
        chatId,
        newMsg,
        {
            new : true
        }
    )
    if(!updatedMsg){
        throw new apiError(500,"Message update unsuccessful")
    }
    return res
    .status(200)
    .json(
        new apiResponse(
            200,
            "Message updated successfully",
            updatedMsg,
            req.originalUrl
        )
    );
})

const getChatByUser = asyncHandeler(async(req,res) => {
    const userId = req.user?._id
    const userChats = await Message.find({
        $or : [
            {senderId : userId},
            {members : {$in : [userId]}}
        ]
    })
    .populate("chatId","members")
    .sort({createdAt : -1})

    if(!userChats){
        throw new apiError(404,"No chats found for this user")
    }
    return res
    .status(200)
    .json(
        new apiResponse(
            200,
            "User chats fetched successfully",
            userChats,
            req.originalUrl
        )
    );
})

export {
    sendMsg,
    getMsg,
    deleteMsg,
    editMsg,
    getChatByUser
}