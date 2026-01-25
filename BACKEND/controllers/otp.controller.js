import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import apiError from "../utils/apiError.utils.js";
import User from "../models/user.model.js";

// Using a Map to store OTPs temporarily 
const otpStore = new Map();

const generateOTP = async (phoneNum) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOTP = await bcrypt.hash(otp, 10);

    otpStore.set(phoneNum, {
        otp: hashedOTP,
        expiresAt: Date.now() + 5 * 60 * 1000 // 5 Minutes
    });

    console.log(`OTP for ${phoneNum}: ${otp}`);
    return otp;
};

//  Send OTP Email
const sendOTP = async (req, res) => {
    // console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS);
    const { phoneNum } = req.body;
    if (!phoneNum) {
        throw new apiError(400, "Phone number is required");
    }

    const getmail = await User.findOne({ phoneNum });
    if (!getmail) {
        throw new apiError(404, "User with this phone number does not exist. Sign up first");
    }
    const mail = getmail?.mail;

    if (!mail) {
        throw new apiError(404, "Email not found for the provided phone number");
    }
    const otp = await generateOTP(phoneNum);

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: mail,
            subject: "Your Verification Code",
            text: `Your OTP is ${otp}. It is valid for 5 minutes. Do not share this with anyone.`
        };
    
        await transporter.sendMail(mailOptions);
        console.log(`Email successfully sent to ${mail}`);
        res.status(200).json({ message: "OTP sent to your email" });
    } catch (error) {
        console.error("Nodemailer Error:", error.message);
        throw new Error("Failed to send email");
    }
};


//  Verify OTP

const verifyOTP = async (req, res,next) => {
    const { phoneNum, otp } = req.body;

    if (!phoneNum || !otp) {
        throw new apiError(400, "phoneNum and OTP are required for verification");
    }

    const data = otpStore.get(phoneNum);

    if (!data) {
        throw new apiError(400, "No OTP found for this phone number or OTP already used");
    }

    // Check expiration
    if (Date.now() > data.expiresAt) {
        otpStore.delete(phoneNum);
        throw new apiError(400, "OTP has expired");
    }

    // Compare hashed OTP
    const isValid = await bcrypt.compare(otp, data.otp);
    if (!isValid) {
        throw new apiError(400, "Invalid OTP");
    }

    // Success - Remove OTP from store
    otpStore.delete(phoneNum);
    console.log(`OTP for ${phoneNum} verified successfully`);
    next();
};

export { sendOTP, verifyOTP };