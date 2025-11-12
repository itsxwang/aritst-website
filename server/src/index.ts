import express from "express";
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

// Health check
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

// Mount routers
app.use(artworkRouter);
app.use(checkoutRouter);
app.use(emailRouter);
app.use(verifyRouter);
app.use("/404", (_req, res) => res.status(404).json({ error: "Not Found" }));
// Try to connect to MongoDB if URI provided, but do NOT exit on failure.
// Serverless environments should not crash at import time.
const mongoUri = process.env.MONGO_URI;
console.log("red", mongoUri);

if (mongoUri) {
  mongoose
    .connect(mongoUri)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => {
      console.error("MongoDB connection error (will continue without DB):", err);
    });
} else {
  console.warn("MONGODB_URI not set — skipping MongoDB connection.");
}

// Only start a listener when running as a normal server (local/dev).
// Vercel / serverless will import this file and call the exported handler.
if (!process.env.VERCEL) {
  const PORT = process.env.BACKEND_PORT || 7001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export a handler compatible with @vercel/node (and other serverless runners)
export default function handler(req: any, res: any) {
  return app(req, res);
}
