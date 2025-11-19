import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import artworkRouter from "./router/artworkRouter";
import checkoutRouter from "./router/checkoutRouter";
import emailRouter from "./router/emailRouter";
import verifyRouter from "./router/verifyRouter";

dotenv.config();

const app = express();

// CORS + JSON
app.use(cors());
app.use(express.json());

// Global Mongo connection variable
let isConnected = false;

// 🔌 MongoDB Connection Function
async function connectToMongoDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URI as string, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });

    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

// Connect automatically if URI exists
if (process.env.MONGO_URI) {
  connectToMongoDB();
} else {
  console.warn("⚠️ MONGO_URI not set — skipping MongoDB connection.");
}

// Routes
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

app.use("/api/artwork", artworkRouter);
app.use("/api/checkout", checkoutRouter);
app.use("/api/email", emailRouter);
app.use("/api/verify", verifyRouter);

app.use("/api/404", (_req, res) => res.status(404).json({ error: "Not Found" }));

// Error handler
app.use((err: any, _req: Request, res: Response) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

// ❗ NO app.listen() FOR VERCEL ❗
// Instead, export the serverless handler:
export default app;
