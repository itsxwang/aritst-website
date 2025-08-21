import { Request, Response } from "express";
import dotenv from "dotenv";
import artworkSchema from "../models/artworkModel";
import nodemailer from "nodemailer";

dotenv.config();

export const postCheckout = async (req: Request, res: Response) => {
    const { name, email, address, phone, altPhone, countryCode } = req.body.userDetails;

    const artworks = await artworkSchema.find({ _id: { $in: req.body.arts } });


    type artworkType = { title: string; quantity: number, totalprice: number }
    if (artworks.length !== req.body.arts.length) {
        return res.status(200).json({ error: "Some artworks not found or are out of stock." });
    }


    const finalArtworks: artworkType[] = [];
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

        const transporter = nodemailer.createTransport({
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
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to send email and Order not placed." });
    }

}