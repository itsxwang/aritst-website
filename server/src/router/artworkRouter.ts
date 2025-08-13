import { Router } from "express"; 
const router = Router();

import { getAllArtworks } from "../controller/artworkController";

router.get("/api/artworks", getAllArtworks);

export default router;