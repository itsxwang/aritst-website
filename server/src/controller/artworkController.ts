import { Request, Response} from 'express';
import Artworks from '../models/artworkModel'

export async function getAllArtworks(req: Request  ,res : Response ) {
    const artworks = await Artworks.find();
    return res.status(200).json(artworks);
}

export async function updateArtwork(req: Request  ,res : Response ) {
    const id = req.body._id;
    // console.log(req.body.artwork);
    const updatedArtwork = await Artworks.findOneAndUpdate({ _id: id }, req.body.artwork, { new: true });
    console.log(updatedArtwork);
    return res.status(200).json(updatedArtwork);
}