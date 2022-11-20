import { Request, Response } from 'express';
import { appConfiguration } from '../Config';
import * as Album from '../BAL/bAlbum';
import { IAlbum } from '../DAL/Album';

const InitCache = async () => {
    let cache = new Map();
    const result = await Album.GetAllAlbums();
    result.Payload.forEach((album: any) => {
        if (album.dataValues.Id) {
            cache.set(album.dataValues.Id, album.dataValues);
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
    return res.status(result.Status).json({ msg: result.Message, payload: result.Payload });
};

export const CreateAlbum = async (req: Request, res: Response): Promise<Response> => {
    if ((await AlBUM_CACHE).size === appConfiguration.albums.max) {
        return res.status(400).json({ msg: 'Limit of albums reached', payload: null });
    }

    const request: IAlbum = {
        Name: req.body.name,
        Artist: req.body.artist,
        Year: req.body.year,
        ImageUrl: req.body.imageUrl,
    };
    const result = await Album.CreateAlbum(request);
    if (result.Status === 200) {
        (await AlBUM_CACHE).set(result.Payload.Id, result.Payload);
    }
    return res.status(result.Status).json({ msg: result.Message, payload: result.Payload });
};

export const GetAlbumById = async (req: Request, res: Response): Promise<Response> => {
    const albumId = req.params.id;
    const album = (await AlBUM_CACHE).get(parseInt(albumId));
    if (album) {
        return res.status(200).json({ msg: 'Album retrieved correctly', payload: album });
    }
    const result = await Album.GetAlbumById(albumId);
    if (result.Status === 200) {
        (await AlBUM_CACHE).set(parseInt(result.Payload.Id), result.Payload);
    }
    return res.status(result.Status).json({ msg: result.Message, payload: result.Payload });
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
    if (result.Status === 200) {
        (await AlBUM_CACHE).set(parseInt(albumId), result.Payload);
    }
    return res.status(result.Status).json({ msg: result.Message, payload: result.Payload });
};

export const DeleteAlbumById = async (req: Request, res: Response): Promise<Response> => {
    const albumId = req.params.id;
    const result = await Album.DeleteAlbumById(albumId);
    if (result.Status === 200) {
        (await AlBUM_CACHE).delete(parseInt(albumId));
    }
    return res.status(result.Status).json({ msg: result.Message, payload: result.Payload });
};
