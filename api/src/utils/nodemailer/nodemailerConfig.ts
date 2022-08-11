import nodemailer from "nodemailer";
const {REWORK_MAIL, REWORK_PASSWORD} = process.env


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: REWORK_MAIL,
        pass: REWORK_PASSWORD,
    },
    debug:false,
    tls: {
        rejectUnauthorized: false
    } 
})
export default transporter