import nodemailer from 'nodemailer';
import { OTP } from '../models/otp.model.js';

export async function sentOtpService(email) {
    const otp = Math.floor(1000 + Math.random() * 9000).toString()

    // Upsert OTP (replace if it already exists)
    await OTP.findOneAndDelete(
        { email },
    )

    await OTP.insertOne({
        email, otp
    })
    // Sent email
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
            user: "sssmmm436480@gmail.com",
            pass: "ojhhourorbkpohpz"
        }
    })

    const info = await transporter.sendMail({
        from: '"Storage App" <sssmmm436480@gmail.com>',
        to: email,
        subject: "Email verification",
        html: `<p>Your OTP is : <b> ${otp} </b>.</p>`
    })

    return { success: true, message: "OTP sent successfully"}
}