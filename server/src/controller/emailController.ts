
import { Request, Response } from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

export async function sendEmail(req: Request, res: Response) {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required." });
    }
    
    try {

        const transporter = nodemailer.createTransport({
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
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to send email." });
    }

} 