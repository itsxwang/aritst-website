"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyNewsletter = verifyNewsletter;
exports.verifyId = verifyId;
exports.verifyEmail = verifyEmail;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
const verifyModel_1 = require("../models/verifyModel");
dotenv_1.default.config();
async function verifyNewsletter(req, res) {
    try {
        const { email } = req.body;
        // check in Verification that if email already exists, then give error
        const existingVerifyEmail = await verifyModel_1.Verification.findOne({ email });
        if (existingVerifyEmail) {
            return res.status(400).json({ error: "Verification request for this email already pending. Try few minutes later or use another email." });
        }
        // check in emails that if email already exists, then give error
        const existingEmail = await verifyModel_1.userEmails.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ error: "This Email is already subscribed to newsletter." });
        }
        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }
        // generate 6 digit random code
        const randomCode = Math.floor(100000 + Math.random() * 900000);
        // save verification request
        const verification = await verifyModel_1.Verification.create({ email, code: randomCode });
        // send 6 digit code by email
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });
        await transporter.sendMail({
            from: `"Samridhi Studio" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: "Your Verification Code",
            text: `Your code is ${randomCode}. It will expire in 10 minutes.`,
            replyTo: process.env.GMAIL_USER
        });
        // send back the ID so frontend can use /verify?id=...
        return res.json({ _id: verification._id });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
}
async function verifyId(req, res) {
    const id = req.params.id;
    try {
        const verification = await verifyModel_1.Verification.findById(id);
        if (!verification) {
            return res.status(400).json({ message: "Invalid or expired verification request." });
        }
        return res.json(verification);
    }
    catch {
        return res.status(400).json({ message: "Invalid or expired verification request." });
    }
}
// verify the email, if valid, save to userEmails
async function verifyEmail(req, res) {
    try {
        const { id, code } = req.body;
        const verification = await verifyModel_1.Verification.findById(id);
        if (!verification) {
            return res.status(400).json({ error: "Invalid or expired verification request." });
        }
        if (verification.code !== Number(code)) {
            console.log("Invalid code");
            return res.status(400).json({ error: "Invalid code" });
        }
        // Save to permanent email list
        await verifyModel_1.userEmails.create({ email: verification.email });
        // Delete verification document (so it doesn’t stay in DB until TTL)
        await verifyModel_1.Verification.findByIdAndDelete(id);
        return res.json({ message: "Email verified successfully" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error. Please try again later!" });
    }
}
