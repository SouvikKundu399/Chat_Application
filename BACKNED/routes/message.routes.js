import router from "express";
import {
    sendMsg,
    getMsg,
    deleteMsg,
    editMsg,
    getChatByUser
} from "../controllers/message.controller.js";
import authentication from "../middlewares/authentication.middleware.js";

const messageRouter = router.Router();

messageRouter.route("/").post(
    authentication,
    getChatByUser
)

messageRouter.route("/sendMsg/:chatID").post(
    authentication,
    sendMsg
)

messageRouter.route("/getMsg/:chatId").post(
    authentication,
    getMsg
)

messageRouter.route("/deleteMsg/:msgID").post(
    authentication,
    deleteMsg
)

messageRouter.route("/editMsg/:msgID").post(
    authentication,
    editMsg
)

// otpVerificationRoute

export default messageRouter