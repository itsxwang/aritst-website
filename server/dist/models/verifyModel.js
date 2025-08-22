"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userEmails = exports.Verification = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const verificationSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true },
    code: { type: Number, required: true },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 600 // 600 sec = 10 minutes
    }
});
const emailSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true },
    subscribedAt: {
        type: Date,
        default: Date.now,
    }
});
exports.Verification = mongoose_1.default.model("Verification", verificationSchema);
exports.userEmails = mongoose_1.default.model("userEmails", emailSchema);
