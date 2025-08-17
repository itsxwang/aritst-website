
import mongoose from "mongoose";

const verificationSchema = new mongoose.Schema({
    email: { type: String, required: true },
    code: { type: Number, required: true },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 600 // 600 sec = 10 minutes
    }
});

const emailSchema = new mongoose.Schema({
    email: { type: String, required: true },
    subscribedAt: {
        type: Date,
        default: Date.now,
    }
});

export const Verification = mongoose.model("Verification", verificationSchema);
export const userEmails = mongoose.model("userEmails", emailSchema);