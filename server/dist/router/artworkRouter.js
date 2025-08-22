"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const artworkController_1 = require("../controller/artworkController");
router.get("/api/artworks", artworkController_1.getAllArtworks);
router.patch("/api/artworks", artworkController_1.updateArtwork);
exports.default = router;
