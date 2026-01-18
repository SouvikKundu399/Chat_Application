import dotenv from "dotenv"
import { app } from "./app.js"
import connectDB from "./db/index.js"
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { deleteMsg, editMsg, sendMsg } from "./controllers/message.controller.js";
import { getMsg } from "./controllers/message.controller.js";
import socketAuth from "./middlewares/socketAuth.middleware.js";

dotenv.config({
    path: "./.env"
})

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: "GET,POST,PUT,DELETE,PATCH",
        credentials: true
    }
});

io.use(socketAuth)


// socket io connection
io.on("connection", (socket) => {
    socket.on("join-room", (roomId) => {
        socket.join(roomId);
        console.log(`User joined roomId: ${roomId}`);
    });

    socket.on("connected-user-info", async(chatId) => {
        try {
            console.log("ChatId :", chatId);

            const allMsg = await getMsg(chatId);
            console.log("All Messages to send:", allMsg);
            socket.emit("get-all-msg", allMsg);
        } catch (err) {
            console.error("Get messages error:", err);
            socket.emit("error", "Failed to get messages");
        }
    })
    socket.on("send-message", async ({ chatId, message, roomId }) => {
        try {
            const currentUserId = socket.user?._id
            console.log("roomId", roomId);
            const newMessage = await sendMsg(currentUserId,chatId, message);
            console.log(newMessage)
            io.to(roomId).emit("new-message", newMessage);
        } catch (err) {
            console.error("Send message error:", err);
            socket.emit("error", "Failed to send message");
        }
    });
    socket.on("delete-message", async({msgId,roomId}) =>{
        try {
            const deleteMessage = await deleteMsg(msgId)
            if (deleteMessage) {
                io.to(roomId).emit("deleted-msgId",msgId)
            }
        } catch (err) {
            console.error("Delete message error:", err);
            socket.emit("error", "Failed to delete message");
        }
    })

    socket.on("edit-msg", async ({ editingId: msgID, editText: newMsg, roomId }) => {
        try {
            const currentUserId = socket.user?._id
            console.log(msgID +" "+newMsg+ " "+roomId)
            console.log(currentUserId)
            const editMessage = await editMsg(msgID, newMsg, currentUserId)
            console.log("editedMsg : ", editMessage)
            io.to(roomId).emit("updated-msg",{editMessage,msgID})
        } catch (err) {
            console.error("Edit message error:", err);
            socket.emit("error", "Failed to edit message");
        }
    })
    socket.on("leave-room", (roomId) => {
        socket.leave(roomId);
    });

});

connectDB()
    .then(() => {
        server.listen(process.env.PORT || 5000, () => {
            console.log("Server is created")
        })
    })
    .catch((error) => {
        console.log("Failed to connect DB", error)
    })

