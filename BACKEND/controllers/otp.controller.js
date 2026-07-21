import bcrypt from "bcrypt";
import { Resend } from "resend";
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
        const resend = new Resend(process.env.RESEND_API_KEY);
        const { data, error } = await resend.emails.send({
            from: process.env.EMAIL_FROM,
            to: mail,
            subject: "Verify Your Email - OTP Code",
            html: `
        <div style="font-family: Arial, Helvetica, sans-serif; background:#f4f4f4; padding:40px 20px;">
            <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 10px rgba(0,0,0,0.1);">

                <div style="background:#2563eb; color:#ffffff; padding:20px; text-align:center;">
                    <h2 style="margin:0;">MsgMe</h2>
                </div>

                <div style="padding:30px;">
                    <h2 style="color:#333;">Email Verification</h2>

                    <p style="color:#555; line-height:1.6;">
                        Hello,
                    </p>

                    <p style="color:#555; line-height:1.6;">
                        Thank you for using <strong>MsgMe</strong>.
                        Use the verification code below to complete your email verification.
                    </p>

                    <div style="text-align:center; margin:30px 0;">
                        <div style="
                            display:inline-block;
                            padding:15px 35px;
                            background:#2563eb;
                            color:#ffffff;
                            font-size:32px;
                            font-weight:bold;
                            border-radius:8px;
                            letter-spacing:8px;
                        ">
                            ${otp}
                        </div>
                    </div>

                    <p style="color:#555; line-height:1.6;">
                        This OTP is valid for <strong>5 minutes</strong>.
                    </p>

                    <p style="color:#d32f2f; font-weight:bold;">
                        Never share this code with anyone.
                    </p>

                    <hr style="border:none; border-top:1px solid #eee; margin:30px 0;">

                    <p style="font-size:13px; color:#777;">
                        If you didn't request this verification, you can safely ignore this email.
                    </p>
                </div>

                <div style="background:#f8f8f8; padding:15px; text-align:center; font-size:12px; color:#777;">
                    © ${new Date().getFullYear()} MsgMe. All rights reserved.
                </div>

            </div>
        </div>
        `,
        });

        if (error) {
            console.error("Resend Error:", error);
            throw new apiError(500, "Failed to send email");
        }

        console.log(`Email successfully sent to ${mail}, id: ${data?.id}`);
        res.status(200).json({ message: "OTP sent to your email" });

    } catch (error) {
        console.error("Email sending error:", error.message);
        throw new apiError(500, "Failed to send email");
    }
};

//  Verify OTP
const verifyOTP = async (req, res, next) => {
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