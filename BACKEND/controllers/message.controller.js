import apiError from "../utils/apiError.utils.js";
import asyncHandeler from "../utils/asynHandler.utils.js";
import apiResponse from "../utils/apiResponse.utils.js";
import Message from "../models/message.model.js";
import Chat from "../models/chats.model.js";

const sendMsg = async (currentUserId,chatId, message) => {
    if (!chatId) {
        throw new apiError(501, "Chat ID was not found")
    }
    
    if (!chatId || !message){
        throw new apiError(401,"chatId or msg is missing")
    }

    const newMessage = await Message.create({
        chatId,
        senderId: currentUserId,
        message
    })
    console.log("New Message: ",newMessage);
    if(!newMessage){
        throw new apiError(500,"Sending Message is unsuccessful")
    }
    return newMessage;
}

const getMsg = async (chatId) => {
    if (!chatId) {
        throw new apiError(501, "Chat ID was not found")
    }
    console.log("Chat ID: ",chatId);
    const allMsg = await Message.find({ chatId });
    // console.log("All Messages: ",allMsg);
    
    return allMsg;
}

const deleteMsg = async(msgId) => {
    if (!msgId){
        throw new apiError(404,"Message ID was not found")
    }
    const deletedMsg =  await Message.deleteOne({_id: msgId})
    // console.log(deletedMsg);
    if (!deletedMsg.deletedCount){
        throw new apiError(500,"Message deletion unsuccessful")
    }
    return deletedMsg
}

const editMsg = async (msgID, newMsg, currentUserId) => {
    if (!msgID || !newMsg || !currentUserId){
        throw new apiError(501,"Message ID or newMsg or currentUser was not found")
    }
    console.log(msgID,newMsg);
    const updatedMsg = await Message.findOneAndUpdate(
        { _id: msgID, senderId: currentUserId },
        {
            message: newMsg,
            updatedAt: new Date() 
        },
        { new: true }
    );
    console.log(updatedMsg);
    if(!updatedMsg){
        throw new apiError(500,"Message update unsuccessful")
    }
    return updatedMsg
}

const getChatByUser = asyncHandeler(async(req,res) => {
    const userId = req.user?._id
    const userChats = await Message.find({
        members: userId
    })

    
    .sort({createdAt : -1})
    console.log("User Chats: ",userChats);
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