import { Request, Response } from 'express';
import Artworks from '../models/artworkModel';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

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

export async function getAllArtworks(req: Request, res: Response) {
  try {
    // Ensure connection before querying
    await ensureConnection();

    const artworks = await Artworks.find({});
    console.log(`✅ Fetched ${artworks.length} artworks`);
    return res.status(200).json(artworks);
  } catch (error: any) {
    console.error("❌ Error fetching artworks:", error);
    return res
      .status(500)
      .json({
        message: "Internal Server Error",
        error: error.message || "Unknown error",
      });
  }
}

export async function updateArtwork(req: Request, res: Response) {
  try {
    // Ensure connection before querying
    await ensureConnection();

    const id = req.body._id;
    const updatedArtwork = await Artworks.findOneAndUpdate(
      { _id: id },
      req.body.artwork,
      { new: true }
    );
    console.log("✅ Artwork updated:", updatedArtwork);
    return res.status(200).json(updatedArtwork);
  } catch (error: any) {
    console.error("❌ Error updating artwork:", error);
    return res
      .status(500)
      .json({
        message: "Internal Server Error",
        error: error.message || "Unknown error",
      });
  }
}