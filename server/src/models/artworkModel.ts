import mongoose from "mongoose";

const artworkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  medium: { type: String, required: true },
  dimensions: { type: String, required: true },
  description: { type: String },
  mainImage: { type: String },
  images: [{ type: String }],
  price: { type: Number, required: true },
  types: [{ type: String }],
  instaVideoLink: { type: String },
  framed: { type: String, default: "No" },
  created_at: { type: String, required: true }, 
  availability: { type: String }, // Available, Sold or Reserved
  stock_quantity: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
});

export default  mongoose.model("Artwork", artworkSchema);
