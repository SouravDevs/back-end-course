import { OTP } from "../models/otp.model.js";
import { sentOtpService } from "../services/sendOtpService.js";

export const sendOTP = async (req, res, next) => {
    const { email } = req.body;
    const resData = await sentOtpService(email)
    res.status(201).json({resData})
}

export const verifyOTP = async (req, res, next) => {
    const { email, otp } = req.body;
    const otpRecord = await OTP.findOne({email, otp});

    if(!otpRecord) {
       return res.status(400).json({error: "Invalid or Expired OTP"})
    }

    console.log(otpRecord);

    res.json({message: "OTP verified"})
}