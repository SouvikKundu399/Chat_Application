import apiError from "../utils/apiError.utils.js";
import asyncHandeler from "../utils/asynHandler.utils.js";
import apiResponse from "../utils/apiResponse.utils.js";
import Message from "../models/message.model.js";
import Chat from "../models/chats.model.js";

const sendMsg = asyncHandeler(async(req,res) => {
    const {contactId} = req.params
    const {message : msg} = req.body
    const id = contactId
    console.log("Contact ID: ",contactId);
    console.log("Message: ",msg);
    const chat = await Chat.findOne({
        members: { $all: [req.user._id, id] }
    }).select("_id");
    const chatId = chat?._id;
    console.log("Chat ID: ",chatId);
    if (!chatId) {
        throw new apiError(501, "Chat ID was not found")
    }
    
    if(!chatId || ! msg){
        throw new apiError(401,"chatId or msg is missing")
    }

    const newMessage = await Message.create({
        chatId : chatId,
        senderId : req.user?._id,
        message : msg
    })
    console.log("New Message: ",newMessage);
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
            
        )
    );
})

const getMsg = asyncHandeler(async(req,res) => {
    const {contactId} = req.params
    if(!contactId){
        throw new apiError(501,"Contact ID was not found")
    }
    const chatId = await Chat.findOne({
        members: { $all: [req.user._id, contactId] }
    }).select("_id");
    if (!chatId) {
        throw new apiError(501, "Chat ID was not found")
    }
    console.log("Chat ID: ",chatId);
    const allMsg = await Message.find({ chatId });
    console.log("All Messages: ",allMsg);
    

    return res
    .status(200)
    .json(
        new apiResponse(
            200,
            "All Messages fetched successfully",
            allMsg,
            req.originalUrl
        )
    );
})

const deleteMsg = asyncHandeler(async(req,res) => {
    const {msgID} = req.params
    console.log(msgID);
    if (!msgID){
        throw new apiError(404,"Message ID was not found")
    }
    const deletedMsg =  await Message.deleteOne({_id: msgID})
    console.log(deletedMsg);
    if (!deletedMsg.deletedCount){
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
    const {msgID} = req.params
    const {newMsg} = req.body
    if (!msgID || !newMsg){
        throw new apiError(501,"Message ID or newMsg was not found")
    }
    console.log(msgID,newMsg);
    const updatedMsg = await Message.findOneAndUpdate(
        { _id: msgID, senderId: req.user._id },
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