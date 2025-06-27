import nodemailer from 'nodemailer';

// 
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
        user: "sssmmm436480@gmail.com",
        pass: "ojhhourorbkpohpz"
    }
})

const info = await transporter.sendMail({
    from: '"Sourav Sarkar" <sssmmm436480@gmail.com',
    to: "sourav2x4x@gmail.com",
    subject: "Hello",
    text: "Hello from nodemailer",
    html: `<b style="color: orange;">Hello from nodemailer </b>`
})

console.log("Message sent: %s", info.messageId);