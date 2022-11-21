import { Request, Response } from 'express';
import * as Song from '../BAL/bSong';
import { ISong } from '../DAL/Song';

export const GetAllSongs = async (req: Request, res: Response): Promise<Response> => {
    const albumId = req.params.albumId;
    const result = await Song.GetAllSongs(albumId);
    return res.status(result.status).json({ msg: result.message, payload: result.payload });
};

export const CreateSong = async (req: Request, res: Response): Promise<Response> => {
    const request: ISong = {
        albumId: req.params.albumId,
        name: req.body.name,
        duration: req.body.duration,
    };
    const result = await Song.CreateSong(request);
    return res.status(result.status).json({ msg: result.message, payload: result.payload });
};

export const EditSongById = async (req: Request, res: Response): Promise<Response> => {
    const songId = req.params.id;
    const request: ISong = {
        name: req.body.name,
        duration: req.body.duration,
    };
    const result = await Song.EditSongById(songId, request);
    return res.status(result.status).json({ msg: result.message, payload: result.payload });
};

export const DeleteSongById = async (req: Request, res: Response): Promise<Response> => {
    const songId = req.params.id;
    const result = await Song.DeleteSongById(songId);
    return res.status(result.status).json({ msg: result.message, payload: result.payload });
};
