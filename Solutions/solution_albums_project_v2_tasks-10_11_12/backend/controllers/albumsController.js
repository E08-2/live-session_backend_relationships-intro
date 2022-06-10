import Album from "../models/album.js";
import createError from "http-errors";

export const albumsPost = async (req, res, next) => {
    const newAlbum = new Album(req.body);

    try {
        await newAlbum.save()
    } catch {
        return next(createError(500, "Album couldn't be created. Please try again"));
    }

    res.json({ id: newAlbum._id });
}