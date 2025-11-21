import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import serverless from "serverless-http";
import dotenv from "dotenv";

import artworkRouter from "../src/router/artworkRouter";
import checkoutRouter from "../src/router/checkoutRouter";
import emailRouter from  "../src/router/emailRouter";
import verifyRouter from  "../src/router/verifyRouter";

dotenv.config();

const app = express();

// ---------------------
// CORS
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
// MongoDB - Vercel Safe
// ---------------------
// Fix global type for cache
let cached = (globalThis as any).mongoose as {
  conn: mongoose.Mongoose | null;
  promise: Promise<mongoose.Mongoose> | null;
};

if (!cached) {
  cached = (globalThis as any).mongoose = { conn: null, promise: null };
}

async function connectToMongoDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGO_URI!, {
        bufferCommands: false,
      })
      .then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

// connect on first request only
connectToMongoDB();


// ---------------------
// Routes
// ---------------------
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
app.use(artworkRouter);
app.use(checkoutRouter);
app.use(emailRouter);
app.use("/verify", verifyRouter);


// ---------------------
// Export for Vercel
// ---------------------
export const handler = serverless(app);
export default app;
