import { Request, Response } from 'express';
import { appConfiguration } from '../Config';
import * as Album from '../BAL/bAlbum';
import { IAlbum } from '../DAL/Album';

const InitCache = async () => {
    let cache = new Map();
    const result = await Album.GetAllAlbums();
    result.payload.forEach((album: any) => {
        if (album.dataValues.id) {
            cache.set(album.dataValues.id, album.dataValues);
        }
    });
    return cache;
};

let AlBUM_CACHE = InitCache();

export const GetAllAlbums = async (req: Request, res: Response): Promise<Response> => {
    if ((await AlBUM_CACHE).size > 0) {
        let payload: any = [];
        (await AlBUM_CACHE).forEach((album) => {
            payload.push(album);
        });
        return res.status(200).json({ msg: 'All albums retrieved correctly', payload: payload });
    }
    const result = await Album.GetAllAlbums();
    return res.status(result.status).json({ msg: result.message, payload: result.payload });
};

export const CreateAlbum = async (req: Request, res: Response): Promise<Response> => {
    if ((await AlBUM_CACHE).size === appConfiguration.albums.max) {
        return res.status(400).json({ msg: 'Limit of albums reached', payload: null });
    }
    const request: IAlbum = {
        name: req.body.name,
        artist: req.body.artist,
        year: req.body.year,
        imageUrl: req.body.imageUrl,
    };
    const result = await Album.CreateAlbum(request);
    if (result.status === 200) {
        (await AlBUM_CACHE).set(result.payload.id, result.payload);
    }
    return res.status(result.status).json({ msg: result.message, payload: result.payload });
};

export const GetAlbumById = async (req: Request, res: Response): Promise<Response> => {
    const albumId = req.params.id;
    const album = (await AlBUM_CACHE).get(parseInt(albumId));
    if (album) {
        return res.status(200).json({ msg: 'Album retrieved correctly', payload: album });
    }
    const result = await Album.GetAlbumById(albumId);
    if (result.status === 200) {
        (await AlBUM_CACHE).set(parseInt(result.payload.id), result.payload);
    }
    return res.status(result.status).json({ msg: result.message, payload: result.payload });
};

export const EditAlbumById = async (req: Request, res: Response): Promise<Response> => {
    const albumId = req.params.id;
    const request: IAlbum = {
        name: req.body.name,
        artist: req.body.artist,
        year: req.body.year,
        imageUrl: req.body.imageUrl,
    };
    const result = await Album.EditAlbumById(albumId, request);
    if (result.status === 200) {
        (await AlBUM_CACHE).set(parseInt(albumId), result.payload);
    }
    return res.status(result.status).json({ msg: result.message, payload: result.payload });
};

export const DeleteAlbumById = async (req: Request, res: Response): Promise<Response> => {
    const albumId = req.params.id;
    const result = await Album.DeleteAlbumById(albumId);
    if (result.status === 200) {
        (await AlBUM_CACHE).delete(parseInt(albumId));
    }
    return res.status(result.status).json({ msg: result.message, payload: result.payload });
};
