"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postCheckout = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const artworkModel_1 = __importDefault(require("../models/artworkModel"));
const nodemailer_1 = __importDefault(require("nodemailer"));
dotenv_1.default.config();
const postCheckout = async (req, res) => {
    const { name, email, address, phone, altPhone, countryCode } = req.body.userDetails;
    const artworks = await artworkModel_1.default.find({ _id: { $in: req.body.arts } });
    if (artworks.length !== req.body.arts.length) {
        return res.status(200).json({ error: "Some artworks not found or are out of stock." });
    }
    const finalArtworks = [];
    artworks.forEach((artwork) => {
        for (let i of req.body.arts) {
            if (artwork._id.toString() === i._id.toString()) {
                finalArtworks.push({
                    title: artwork.title,
                    quantity: i.quantity,
                    totalprice: artwork.price * i.quantity
                });
                break;
            }
        }
    });
    try {
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            },
        });
        await transporter.sendMail({
            from: `"website" <${process.env.GMAIL_USER}>`,
            to: process.env.RECEIVER_EMAIL,
            subject: `New order from website by "${name}" :"`,
            text: `
            Name: ${name}
            Email: ${email}
            Address: ${address}
            Phone: +${countryCode} ${phone}
            Alternate Phone: ${altPhone ? "-" : altPhone} 
            Artworks: ${JSON.stringify(finalArtworks, null, 2)}`,
            replyTo: email
        });
        res.status(200).json({ message: "Email sent successfully." });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to send email and Order not placed." });
    }
};
exports.postCheckout = postCheckout;
