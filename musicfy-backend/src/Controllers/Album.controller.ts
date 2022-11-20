import { Request, Response } from 'express';
import * as Album from '../BAL/bAlbum';
import { IAlbum } from '../DAL/Album';

export const GetAllAlbums = async (req: Request, res: Response): Promise<Response> => {
    const result = await Album.GetAllAlbums();
    return res.status(result.status).json({ msg: result.message, payload: result.payload });
};

export const CreateAlbum = async (req: Request, res: Response): Promise<Response> => {
    const request: IAlbum = {
        Name: req.body.name,
        Artist: req.body.artist,
        Year: req.body.year,
        ImageUrl: req.body.imageUrl,
    };
    const result = await Album.CreateAlbum(request);
    return res.status(result.status).json({ msg: result.message, payload: result.payload });
};

export const GetAlbumById = async (req: Request, res: Response): Promise<Response> => {
    const albumId = req.params.id;
    const result = await Album.GetAlbumById(albumId);
    return res.status(result.status).json({ msg: result.message, payload: result.payload });
};

export const EditAlbumById = async (req: Request, res: Response): Promise<Response> => {
    const albumId = req.params.id;
    const request: IAlbum = {
        Name: req.body.name,
        Artist: req.body.artist,
        Year: req.body.year,
        ImageUrl: req.body.imageUrl,
    };
    const result = await Album.EditAlbumById(albumId, request);
    return res.status(result.status).json({ msg: result.message, payload: result.payload });
};

export const DeleteAlbumById = async (req: Request, res: Response): Promise<Response> => {
    const albumId = req.params.id;
    const result = await Album.DeleteAlbumById(albumId);
    return res.status(result.status).json({ msg: result.message, payload: result.payload });
};
