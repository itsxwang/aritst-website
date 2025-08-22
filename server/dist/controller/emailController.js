"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = sendEmail;
const dotenv_1 = __importDefault(require("dotenv"));
const nodemailer_1 = __importDefault(require("nodemailer"));
dotenv_1.default.config();
async function sendEmail(req, res) {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required." });
    }
    try {
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            },
        });
        await transporter.sendMail({
            from: `"${name}" <${process.env.GMAIL_USER}>`,
            to: process.env.RECEIVER_EMAIL,
            subject: `New contact form message from "${name}"`,
            text: message,
            replyTo: email,
        });
        res.status(200).json({ success: "Email sent successfully." });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to send email." });
    }
}
