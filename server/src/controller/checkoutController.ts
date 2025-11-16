import { Request, Response } from "express";
import dotenv from "dotenv";
import artworkSchema from "../models/artworkModel";
import nodemailer from "nodemailer";

dotenv.config();

export const postCheckout = async (req: Request, res: Response) => {
    const { name, email, address, phone, altPhone, countryCode } = req.body.userDetails;
    const artworks = await artworkSchema.find({ _id: { $in: req.body.arts.map((a: any) => a._id) } });

    type artworkType = { title: string; quantity: number; totalprice: number };
    console.log("---------------------)", req.body.userDetails)
    if (artworks.length !== req.body.arts.length) {
        return res.status(400).json({ error: "Some artworks not found or are out of stock." });
    }

    const finalArtworks: artworkType[] = [];

    // Update stock quantities
    for (let artwork of artworks) {
        for (let i of req.body.arts) {
            if (artwork._id.toString() === i._id.toString()) {
                // Check if stock is available
                if (artwork.stock_quantity < i.quantity) {
                    return res.status(400).json({ error: `Insufficient stock for ${artwork.title}` });
                }

                finalArtworks.push({
                    title: artwork.title,
                    quantity: i.quantity,
                    totalprice: artwork.price * i.quantity
                });

                artwork.stock_quantity -= i.quantity;
                await artwork.save();
                break;
            }
        }
    }

    try {


        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            },
        });

        // send to website owner
        await transporter.sendMail({
            from:  process.env.GMAIL_USER,
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



        //  send to user
        await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: email,
            subject: "Order Confirmation",
            html: `<h2>Order Confirmed!</h2><p>Hi ${name},</p><p>Your order from <b>Samridhi studio</b> website has been placed successfully.</p>`
        });

        return res.status(200).json({
            message: "Order placed successfully",
            userDetails: { name, email, address, phone, altPhone, countryCode },
            artworks: finalArtworks
        });

    } catch (error: any) {
        console.error("Checkout error:", error);
        return res.status(500).json({ error: "Checkout failed", details: error.message });
    }
};