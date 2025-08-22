"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const artworkSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    medium: { type: String, required: true },
    dimensions: { type: String, required: true },
    description: { type: String },
    mainImage: { type: String },
    images: [{ type: String }],
    price: { type: Number, required: true },
    types: [{ type: String }],
    instaVideoLink: { type: String },
    framed: { type: String, default: "No" },
    created_at: { type: Date, default: Date.now },
    availability: { type: String }, // Available, Sold or Reserved
    stock_quantity: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    isPrintsAvailable: { type: Boolean, default: false }
});
exports.default = mongoose_1.default.model("Artwork", artworkSchema);
