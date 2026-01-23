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

messageRouter.route("/sendMsg/:contactId").post(
    authentication,
    sendMsg
)

messageRouter.route("/getMsg/:chatId").post(
    authentication,
    getMsg
)

messageRouter.route("/deleteMsg/:msgID").delete(
    authentication,
    deleteMsg
)

messageRouter.route("/editMsg/:msgID").put(
    authentication,
    editMsg
)

// otpVerificationRoute

export default messageRouter