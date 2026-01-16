import User from "../models/user.model.js";

const socketAuth = async (socket, next) => {
    try {
        const cookieHeader = socket.handshake.headers.cookie;
        console.log("Socket Handshake Cookies:", cookieHeader);
        console.log("Socket Handshake hades :", socket.handshake.headers);
        console.log("Socket Handshake:", socket.handshake.headers);
        if (!cookieHeader) {
            return next(new Error("Authentication error: No cookie provided"));
        }
        const cookies = Object.fromEntries(
            cookieHeader.split("; ").map(c => c.split("="))
        );

        const userId = cookies.currentUserId;

        if (!userId) {
            return next(new Error("User not authenticated"));
        }

        const user = await User.findById(userId);
        if (!user) {
            return next(new Error("User not found"));
        }
        socket.user = user;
        next();
    } catch (error) {
        next(new Error("Authentication error"));
    }       
};
export default socketAuth;
