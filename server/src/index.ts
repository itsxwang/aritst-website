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

app.use(cors());
app.use(express.json());

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

// Connect only if URI exists
if (process.env.MONGO_URI) {
  connectToMongoDB();
} else {
  console.warn("MONGO_URI not set — skipping MongoDB connection.");
}

// Routes
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api", artworkRouter);
app.use("/api", checkoutRouter);
app.use("/api", emailRouter);
app.use("/api", verifyRouter);
app.use("/404", (_req, res) => res.status(404).json({ error: "Not Found" }));

// Error handling middleware
app.use((err: any, _req: Request, res: Response) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({ 
    error: err.message || "Internal Server Error" 
  });
});

// ✅ ONLY for local development (not Vercel)
if (process.env.NODE_ENV === "development") {
  const PORT = process.env.BACKEND_PORT || 7001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// ✅ Export handler for Vercel (required for serverless)
export default function handler(req: Request, res: Response) {
  return app(req, res);
}