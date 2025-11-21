import { Request, Response } from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { Verification, userEmails } from "../models/verifyModel";
import mongoose from "mongoose";

dotenv.config();

// Ensure MongoDB connection before querying
async function ensureConnection() {
  if (mongoose.connection.readyState === 1) {
    return; // Already connected
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI environment variable is not defined");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
      maxPoolSize: 5,
      minPoolSize: 1,
      retryWrites: true,
      w: "majority",
    });
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    throw error;
  }
}

export async function verifyNewsletter(req: Request, res: Response) {
  try {
    // Ensure connection before querying
    await ensureConnection();

    const { email } = req.body;
    // check in Verification that if email already exists, then give error
    const existingVerifyEmail = await Verification.findOne({ email });
    if (existingVerifyEmail) {
      return res.status(400).json({
        error:
          "Verification request for this email already pending. Try few minutes later or use another email.",
      });
    }

    // check in emails that if email already exists, then give error
    const existingEmail = await userEmails.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ error: "This Email is already subscribed to newsletter." });
    }

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // generate 6 digit random code
    const randomCode = Math.floor(100000 + Math.random() * 900000);

    // save verification request
    const verification = await Verification.create({ email, code: randomCode });

    // send 6 digit code by email
    const transporter = nodemailer.createTransport({
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
      replyTo: process.env.GMAIL_USER,
    });

    // send back the ID so frontend can use /verify?id=...
    return res.json({ _id: verification._id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}


// this will all for /verify page
export async function verifyId(req: Request, res: Response) {
  try {
    // Ensure connection before querying
    await ensureConnection();

    const id = req.params.id;

    const verification = await Verification.findById(id);
    if (!verification) {
      return res
        .status(400)
        .json({ message: "Invalid or expired verification request." });
    }
    return res.json(verification);
  } catch (error: any) {
    console.error("❌ Error:", error);
    return res
      .status(400)
      .json({ message: "Invalid or expired verification request." });
  }
}

// verify the email, if valid, save to userEmails
export async function verifyEmail(req: Request, res: Response) {
  try {
    // Ensure connection before querying
    await ensureConnection();

    const { id, code } = req.body;

    const verification = await Verification.findById(id);
    if (!verification) {
      return res
        .status(400)
        .json({ error: "Invalid or expired verification request." });
    }

    if (verification.code !== Number(code)) {
      console.log("Invalid code");
      return res.status(400).json({ error: "Invalid code" });
    }

    // Save to permanent email list
    await userEmails.create({ email: verification.email });

    // Delete verification document (so it doesn’t stay in DB until TTL)
    await Verification.findByIdAndDelete(id);

    return res.json({ message: "Email verified successfully" });
  } catch (err) {
    console.error("❌ Error:", err);
    return res
      .status(500)
      .json({ error: "Server error. Please try again later!" });
  }
}
