import { Request, Response } from 'express';
import Artworks from '../models/artworkModel';
import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();

export async function getAllArtworks(req: Request, res: Response) {
    try {
        const artworks = await Artworks.find({});
        return res.status(200).json(artworks);
    } catch (error: any) {
        console.error("Error fetching artworks:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

export async function updateArtwork(req: Request, res: Response) {
    try {
        const id = req.body._id;
        const updatedArtwork = await Artworks.findOneAndUpdate({ _id: id }, req.body.artwork, { new: true });
        console.log(updatedArtwork);
        return res.status(200).json(updatedArtwork);
    } catch (error: any) {
        console.error("Error updating artwork:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}