import User from "../models/user.model.js";

const socketAuth = async (socket, next) => {
    try {
        console.log("Error In Auth 1")
        const cookieHeader = socket.handshake.headers.cookie;
        console.log(cookieHeader)
        if (!cookieHeader) return next(new Error("No cookie"));
        console.log("Error In Auth 2")

        const cookies = {};
        cookieHeader.split(";").forEach(c => {
            const [key, ...v] = c.trim().split("=");
            cookies[key] = v.join("=");
        });

        const userId = cookies.currentUserId;
        if (!userId) return next(new Error("Unauthenticated"));

        const user = await User.findById(userId);
        if (!user) return next(new Error("User not found"));

        socket.user = user;
        next();
    } catch (err) {
        next(new Error("Socket auth failed"));
    }
};

export default socketAuth;
