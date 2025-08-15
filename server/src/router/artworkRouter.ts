import { Router } from "express"; 
const router = Router();

import { getAllArtworks,updateArtwork } from "../controller/artworkController";

router.get("/api/artworks", getAllArtworks);
router.patch("/api/artworks", updateArtwork);

export default router;