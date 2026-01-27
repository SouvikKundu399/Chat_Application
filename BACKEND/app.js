import dotenv from "dotenv";
dotenv.config();
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();
const FrontendURL = process.env.FRONTEND_URL;
const LocalURL = process.env.LOCAL_URL;

app.use(cors({
    origin: [FrontendURL, LocalURL],
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true,limit: '16kb' }));
app.use(express.static("public"));
app.use(cookieParser());



import userRoute from "./routes/user.routes.js"
import messageRouter from "./routes/message.routes.js";
import chatRouter from "./routes/chat.routes.js";


app.use("/api/lt/user", userRoute)
app.use("/api/lt/msg", messageRouter)
app.use("/api/lt/chat", chatRouter)

// Global error handler
app.use((err, req, res, next) => {
    console.error('Global error:', err);
    res.status(500).json({ message: 'Internal server error' });
});

export { app };

