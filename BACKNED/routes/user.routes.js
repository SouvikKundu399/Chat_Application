import { Router } from "express";

import {
    registerUser,
    logIn,
    logOut,
    updateUserInfo,
    updateAvatarImage,
    updatePhoneNumber,
    getUser
} from "../controllers/user.controller.js"
import upload from "../middlewares/multer.middleware.js";
import authentication from "../middlewares/authentication.middleware.js";


const userRoute = Router()

userRoute.route("/register").post(
    upload.fields([
        {
            name : "avatar",
            maxCount: 1
        }
    ]),
    registerUser
)

userRoute.route("/login").post(
    logIn
)

userRoute.route("/logout").post(
    authentication,
    logOut
)

userRoute.route("/update").put(
    authentication,
    updateUserInfo
)

userRoute.route("/update/avatar").put(
    authentication,
    upload.single("avatar"),
    updateAvatarImage
)

userRoute.route("/update/phone").put(
    authentication,
    updatePhoneNumber
)

userRoute.route("/getUser").get(
    authentication,
    getUser
)

export default userRoute