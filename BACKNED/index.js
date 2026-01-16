import dotenv from "dotenv"
import { app } from "./app.js"
import connectDB from "./db/index.js"
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import authentication from "./middlewares/authentication.middleware.js";
import { sendMsg } from "./controllers/message.controller.js";
import { getMsg } from "./controllers/message.controller.js";

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


// socket io connection
io.on("connection", (socket) => {
    socket.on("join-room", (room) => {
        socket.join(room);
        console.log(`User joined room: ${room}`);
    });

    socket.on("connected-user-info", async({ currentUserId,memberId}) => {
        // console.log("User connected:", currentUserId, memberId);
        // authentication can be used here to verify user

        const allMsg = await getMsg(currentUserId, memberId);
        // console.log("All Messages to send:", allMsg);
        socket.emit("get-all-msg", allMsg);
    })
    socket.on("send-message", async ({ currentuserID, contactId, message, roomId }) => {
        try {
            const newMessage = await sendMsg(currentuserID, contactId, message);
            console.log("roomId", roomId);
            io.to(roomId).emit("new-message", newMessage);
        } catch (err) {
            console.error("Send message error:", err);
        }
    });

});

connectDB()
    .then(() => {
        server.listen(process.env.PORT || 500, () => {
            console.log("Server is created")
        })
    })
    .catch((error) => {
        console.log("Failed to connect DB", error)
    })

