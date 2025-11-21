import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import artworkRouter from "./router/artworkRouter";
import checkoutRouter from "./router/checkoutRouter";
import emailRouter from "./router/emailRouter";
import verifyRouter from "./router/verifyRouter";

dotenv.config();
mongoose.set("strictQuery", true);

const app = express();

// ---------------------
// CORS CONFIG
// ---------------------
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());


// ---------------------
// MONGODB CONNECTION (Serverless Safe)
// ---------------------
let isConnected = false;

async function connectToMongoDB() {
  if (isConnected) return;

  if (mongoose.connection.readyState === 1) {
    isConnected = true;
    return;
  }

  if (!process.env.MONGO_URI) {
    console.error("❌ MONGO_URI missing");
    throw new Error("Mongo URI missing");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
    });

    isConnected = true;
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ Mongo Connection Failed:", err);
  }
}

connectToMongoDB();

// ---------------------
// ROUTES
// ---------------------
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
app.use(artworkRouter);
app.use(checkoutRouter);
app.use(emailRouter);
app.use("/verify", verifyRouter);

// 404
app.use((_req, res) => res.status(404).json({ error: "Not Found" }));

// ERROR HANDLER
app.use((err: any, _req: Request, res: Response) => {
  console.error("🔥 Error:", err);
  res.status(err.status || 500).json({ error: err.message });
});

// ---------------------
// SERVER
// ---------------------
const PORT = process.env.PORT || 7001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app;
