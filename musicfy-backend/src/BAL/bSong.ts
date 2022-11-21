import * as vf from '../Helpers/ValidateFields';
import { Song, ISong } from '../DAL/Song';
import { Result } from '../DAL/Result';

export async function GetAllSongs(albumId: any): Promise<Result> {
    if (vf.IsNumeric(albumId)) {
        try {
            const songs = await Song.findAll({
                where: {
                    albumId: albumId,
                    deleted: false,
                },
                order: [['createdAt', 'DESC']],
            });
            return new Result(200, 'All songs retrieved correctly', songs);
        } catch (error) {
            return new Result(500, 'Error getting all the songs', error);
        }
    }
    return new Result(400, 'The album id is invalid', null);
}

export async function CreateSong(request: ISong): Promise<Result> {
    if (vf.IsNumeric(request.albumId)) {
        if (vf.IsAlpha(request.name)) {
            if (vf.IsNumeric(request.duration)) {
                try {
                    const newSong = await Song.create({
                        albumId: request.albumId,
                        name: request.name,
                        duration: request.duration,
                        createdAt: Date.now(),
                        updatedAt: Date.now(),
                        deleted: false,
                    });
                    return new Result(200, 'Song created successfully', newSong);
                } catch (error) {
                    return new Result(500, 'Error creating song', error);
                }
            }
        }
        return new Result(400, 'Invalid fields for song', request);
    }
    return new Result(400, 'The album id is invalid', null);
}

export async function EditSongById(id: any, request: ISong): Promise<Result> {
    if (vf.IsNumeric(id)) {
        if (vf.IsAlpha(request.name) && vf.IsNumeric(request.duration)) {
            try {
                const song = await Song.findOne({
                    where: {
                        id: id,
                        deleted: false,
                    },
                });
                song?.set({
                    name: request.name,
                    duration: request.duration,
                    updatedAt: Date.now(),
                });
                await song?.save();
                return new Result(200, 'Song edited successfully', song);
            } catch (error) {
                return new Result(500, 'Error editing song', error);
            }
        }
        return new Result(400, 'Invalid fields for song', request);
    }
    return new Result(400, 'The song id is invalid', null);
}

export async function DeleteSongById(id: any): Promise<Result> {
    if (vf.IsNumeric(id)) {
        try {
            const song = await Song.findOne({
                where: {
                    id: id,
                    deleted: false,
                },
            });
            song?.set({ deleted: true });
            await song?.save();
            return new Result(200, 'Song deleted successfully', song);
        } catch (error) {
            return new Result(500, `Error deleting the song with id ${id}`, error);
        }
    }
    return new Result(400, 'The song id is invalid', null);
}

export async function DeleteSongsByAlbumId(albumId: any): Promise<Result> {
    if (vf.IsNumeric(albumId)) {
        try {
            await Song.update(
                {
                    deleted: true,
                },
                {
                    where: {
                        albumId: albumId,
                        deleted: false,
                    },
                }
            );
            return new Result(200, 'Songs deleted successfully', null);
        } catch (error) {
            return new Result(500, `Error deleting the songs with that album id ${albumId}`, error);
        }
    }
    return new Result(400, 'The album id is invalid', null);
}
