import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: '16kb'}));
app.use(express.urlencoded({ extended: true,limit: '16kb' }));
app.use(express.static("public"));
app.use(cookieParser());



import userRoute from "./routes/user.routes.js"
import messageRouter from "./routes/message.routes.js";
import chatRouter from "./routes/chat.routes.js";


app.use("/api/lt/users", userRoute)
app.use("/api/lt/msg", messageRouter)
app.use("/api/lt/chat", chatRouter)

export {app}


