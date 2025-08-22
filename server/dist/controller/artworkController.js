"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllArtworks = getAllArtworks;
exports.updateArtwork = updateArtwork;
const artworkModel_1 = __importDefault(require("../models/artworkModel"));
async function getAllArtworks(req, res) {
    const artworks = await artworkModel_1.default.find();
    return res.status(200).json(artworks);
}
async function updateArtwork(req, res) {
    const id = req.body._id;
    // console.log(req.body.artwork);
    const updatedArtwork = await artworkModel_1.default.findOneAndUpdate({ _id: id }, req.body.artwork, { new: true });
    console.log(updatedArtwork);
    return res.status(200).json(updatedArtwork);
}
