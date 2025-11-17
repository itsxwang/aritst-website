import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import artworkRouter from "./router/artworkRouter";
import checkoutRouter from "./router/checkoutRouter";
import emailRouter from "./router/emailRouter";
import verifyRouter from "./router/verifyRouter";
import { Request, Response } from "express";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

let isConnected = false;

// ---------------------------------------
// 🔌 MongoDB Connection Function
// ---------------------------------------
async function connectToMongoDB() {
  if (isConnected) return; // Prevent multiple connections on Vercel

  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

// 🟢 Connect only if URI exists
if (process.env.MONGO_URI) {
  connectToMongoDB();
} else {
  console.warn("MONGO_URI not set — skipping MongoDB connection.");
}

// ---------------------------------------
// Routes
// ---------------------------------------
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

app.use(artworkRouter);
app.use(checkoutRouter);
app.use(emailRouter);
app.use(verifyRouter);

app.use("/404", (_req, res) => res.status(404).json({ error: "Not Found" }));

// ---------------------------------------
// 🚀 Local Development Server
// ---------------------------------------
if (!process.env.VERCEL) {
  const PORT = process.env.BACKEND_PORT || 7001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// ---------------------------------------
// 🔁 Export handler for Vercel Serverless
// ---------------------------------------
export default function handler(req: Request, res: Response) {
  return app(req, res);
}
