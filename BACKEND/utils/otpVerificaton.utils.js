import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;     
const authToken = process.env.TWILIO_AUTH_TOKEN; 
const authorityPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const client = twilio(accountSid, authToken);

const sendOtp = async (phoneNumber, otp) => {
    try {
        const message = await client.messages.create({
            body: `Your OTP is ${otp}. It will expire in 5 minutes.`,
            from: `+91${authorityPhoneNumber}`,
            to: `+91${phoneNumber}`,
        });

        console.log("OTP sent:", message.sid);
    } catch (error) {
        console.error("Error sending OTP:", error);
    }
};

export default sendOtp;
