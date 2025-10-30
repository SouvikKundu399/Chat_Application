import apiError from "../utils/apiError.utils.js";
import asyncHandeler from "../utils/asynHandler.utils.js";
import apiResponse from "../utils/apiResponse.utils.js";
import User from "../models/user.model.js"
import { sendOtp } from "../utils/otpVerificaton.utils.js";
import uploadOnCloudinary from "../utils/cloudinary.utils.js";

// phoneNumberVerificationViaOTP

const phoneNumberVerificationViaOTP = ((otp) => {
    // verify otp logic
    return true // return false if otp is not matching
})

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString()
}


const registerUser = asyncHandeler(async(req,res) => {
    // get user detail from user
    // check phone number is null or not
    // add new user 
    // verify opt
    // login user

    const {fullName,userName,description,phoneNum,mail} = req.body

    if(!phoneNum){
        throw new apiError(401,"Phone Number is required")
    }


    const existedUser =  await User.findOne({phoneNum})
    if(existedUser){
        throw new apiError(400,"User with this phone number has already existed")
    }
    const otp = generateOTP()
    sendOtp(phoneNum,otp)  
    if (!phoneNumberVerificationViaOTP(otp)) {
        throw new apiError(400, "Your OTP is not matching")
    }

    const avatarPath = req.fiels?.Path?.[0]?.path
    const newUser = await User.create({
        fullName, 
        userName, 
        description, 
        avatar : avatarPath.url, 
        phoneNum, 
        mail
    })

    if(!newUser){
        throw new apiError(500,"User is unsuccessful to register")
    }


    const currecntUserId = `${newUser._id}`
    const options = {
        httpOnly: true,
        secure: true
    }
    return res
        .status(200)
        .cookie("currecntUserId", currecntUserId, options)
        .json(
            new apiResponse(
                200,
                {
                    user: newUser
                },
                "User Registered Successfully"
            )
        )
})

const logIn = asyncHandeler(async(req,res) => {
    const {phoneNum} = req.body
    if(!phoneNum){
        throw new apiError(400,"Plz enter your phone number")
    }
    const isExistPhoneNum = User.findOne({phoneNum})
    if(!isExistPhoneNum){
        throw new apiError(400, "Plz register your phone number")
    }
    const otp = generateOTP()
    sendOtp(phoneNum, otp)
    if (!phoneNumberVerificationViaOTP(otp)){
        throw new apiError(400, "Your OTP is not matching")
    }
    const user = isExistPhoneNum
    const currecntUserId = `${user._id}`
    const options = {
        httpOnly: true,
        secure: true
    }
    return res
        .status(200)
        .cookie("currecntUserId", currecntUserId, options)
        .json(
            new apiResponse(
                200,
                {
                    user
                },
                "User LoggedIn Successfully"
            )
        )

    
})

const logOut = asyncHandeler(async(req,res) => {
    req.user = ""
    const options = {
        httpOnly: true,
        secure: true
    }
    return res
        .status(200)
        .cookie("currecntUserId", options)
        .json(
            new apiResponse(
                200,
                {},
                "User Logged Out Successfully"
            )
        )
})

const updateUserInfo = asyncHandeler(async(req,res) => {
    const { fullName, userName, description, mail } = req.body
    
    const information = [fullName, userName, description, mail]

    const isEmptyInfo = !information.every((info) => info ==="" )

    if(!isEmptyInfo){
        throw new apiError(400,"Plz provide your information to update")
    }
    const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
            fullName,
            userName,
            description,
            mail
        },
        {new: true}
    )
    if(!updatedUser){
        throw new apiError(500,"User Information is unsuccessful to update")
    }

    return res
        .status(200)
        .json(
            new apiResponse(
                200,
                {
                    user: updatedUser
                },
                "User Information Updated Successfully"
            )
        )

})

const updateAvatarImage = asyncHandeler(async(req,res) => {
    const avatarPath = req.fiels?.avatar?.[0]

    const newAvatar = uploadOnCloudinary(avatarPath)

    const updatedUser = User.findByIdAndUpdate(
        req.user._id,
        {
            avatar: newAvatar.url
        },
        {new: true}     
    )

    if(!updatedUser){
        throw new apiError(500,"User Avatar is unsuccessful to update")
    }

    return res
        .status(200)
        .json(
            new apiResponse(
                200,
                {
                    user: updatedUser
                },
                "User Avatar Updated Successfully"
            )
        )
})

const updatePhoneNumber = asyncHandeler(async (req, res) => {
    const { oldPhoneNum,newPhoneNum } = req.body
    if (!oldPhoneNum) {
        throw new apiError(400, "Plz enter your phone number")
    }
    const isExistPhoneNum = User.findOne({ phoneNum : oldPhoneNum })
    if (!isExistPhoneNum) {
        throw new apiError(400, "Plz register your phone number")
    }
    const otp = generateOTP()
    sendOtp(phoneNum, otp)
    if (!phoneNumberVerificationViaOTP(otp)) {
        throw new apiError(400, "Your OTP is not matching")
    }

    const updatedUser = User.findByIdAndUpdate(
        req.user._id,
        {
            phoneNum: newPhoneNum
        },
        { new: true }
    )

    if (!updatedUser) {
        throw new apiError(500, "Phone Number is unsuccessful to update")
    }

    return res
        .status(200)
        .json(
            new apiResponse(
                200,
                {
                    user: updatedUser
                },
                "Phone Number Updated Successfully"
            )
        )

})

const getUser = asyncHandeler(async (req, res) => {
    return res
        .status(200)
        .json(
            new apiResponse(
                200,
                {
                    user: req.user
                },
                "User Fetched Successfully"
            )
        )       
})


export {
    registerUser,
    logIn,
    logOut,
    updateUserInfo,
    updateAvatarImage,
    updatePhoneNumber,
    getUser
}



