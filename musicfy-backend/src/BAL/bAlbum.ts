import * as vf from '../Helpers/ValidateFields';
import { Album, IAlbum } from '../DAL/Album';
import { Result } from '../DAL/Result';
import { DeleteSongsByAlbumId } from './bSong';

export async function GetAllAlbums(): Promise<Result> {
    try {
        const albums = await Album.findAll({
            where: {
                deleted: false,
            },
            order: [['createdAt', 'DESC']],
        });
        return new Result(200, 'All albums retrieved correctly', albums);
    } catch (error) {
        return new Result(500, 'Error getting all the albums', error);
    }
}

export async function CreateAlbum(request: IAlbum): Promise<Result> {
    if (vf.IsAlpha(request.name) && vf.IsAlpha(request.artist)) {
        if (vf.IsBetweenDates(request.year)) {
            try {
                const newAlbum = await Album.create({
                    name: request.name,
                    artist: request.artist,
                    year: request.year,
                    imageUrl: request.imageUrl,
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                    deleted: false,
                });
                return new Result(200, 'Album created successfully', newAlbum);
            } catch (error) {
                return new Result(500, 'Error creating album', error);
            }
        }
    }
    return new Result(400, 'Invalid fields for album', request);
}

export async function GetAlbumById(id: any): Promise<Result> {
    if (vf.IsNumeric(id)) {
        try {
            const album = await Album.findOne({
                where: {
                    id: id,
                    deleted: false,
                },
            });
            return new Result(200, 'Album retrieved correctly', album);
        } catch (error) {
            return new Result(500, `Error getting the album with id ${id}`, error);
        }
    }
    return new Result(400, 'The album id is invalid', null);
}

export async function EditAlbumById(id: any, request: IAlbum): Promise<Result> {
    if (vf.IsNumeric(id)) {
        if (vf.IsAlpha(request.name) && vf.IsAlpha(request.artist)) {
            if (vf.IsBetweenDates(request.year)) {
                try {
                    const album = await Album.findOne({
                        where: {
                            id: id,
                            deleted: false,
                        },
                    });
                    album?.set({
                        name: request.name,
                        artist: request.artist,
                        year: request.year,
                        imageUrl: request.imageUrl,
                        updatedAt: Date.now(),
                    });
                    await album?.save();
                    return new Result(200, 'Album edited successfully', album);
                } catch (error) {
                    return new Result(500, 'Error editing album', error);
                }
            }
        }
        return new Result(400, 'Invalid fields for album', request);
    }
    return new Result(400, 'The album id is invalid', null);
}

export async function DeleteAlbumById(id: any): Promise<Result> {
    if (vf.IsNumeric(id)) {
        try {
            const album = await Album.findOne({
                where: {
                    id: id,
                    deleted: false,
                },
            });
            album?.set({ deleted: true });
            await album?.save();
            await DeleteSongsByAlbumId(id);
            return new Result(200, 'Album deleted successfully', album);
        } catch (error) {
            return new Result(500, `Error deleting the album with id ${id}`, error);
        }
    }
    return new Result(400, 'The album id is invalid', null);
}
