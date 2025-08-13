import { Request, Response} from 'express';
import Artworks from '../models/artworkModel'

export async function getAllArtworks(req: Request  ,res : Response ) {
    const artworks = await Artworks.find();
    return res.status(200).json(artworks);
}