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

// ---------------------
// CORS CONFIG (IMPORTANT)
// ---------------------
const allowedOrigins = [
  "http://localhost:5173",       // local dev
  "http://localhost:3000",
  "https://your-frontend.vercel.app", // replace with your frontend URL
  "https://samstudio.com"        // replace if using custom domain
];

app.use(cors({ origin: '*' }));
app.use(express.json());

// ---------------------
// MongoDB Connection
// ---------------------
let isConnected = false;

async function connectToMongoDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URI as string, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });

    isConnected = true;
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
  }
}

if (process.env.MONGO_URI) {
  connectToMongoDB();
} else {
  console.warn("⚠ MONGO_URI not set — skipping MongoDB connection.");
}

// ---------------------
// Routes
// ---------------------
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
app.use(artworkRouter);
app.use(checkoutRouter);
app.use(emailRouter);
app.use("/verify", verifyRouter);
app.use("/404", (_req, res) => res.status(404).json({ error: "Not Found" }));

// ---------------------
// Error Handler
// ---------------------
app.use((err: any, _req: Request, res: Response) => {
  console.error("🔥 Error:", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

// ---------------------
// Start Server (Railway)
// ---------------------
const PORT = process.env.PORT || 7001; // Railway provides PORT env

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app;
