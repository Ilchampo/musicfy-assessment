import * as vf from '../Helpers/ValidateFields';
import { Song, ISong } from '../DAL/Song';
import { Result } from '../DAL/Result';

export async function GetAllSongs(albumId: any): Promise<Result> {
    if (vf.IsNumeric(albumId)) {
        try {
            const songs = await Song.findAll({
                where: {
                    AlbumId: albumId,
                    Deleted: false,
                },
                order: [['CreatedAt', 'DESC']],
            });
            return new Result(200, 'All songs retrieved correctly', songs);
        } catch (error) {
            return new Result(500, 'Error getting all the songs', error);
        }
    }
    return new Result(400, 'The album id is invalid', null);
}

export async function CreateSong(request: ISong): Promise<Result> {
    if (vf.IsNumeric(request.AlbumId)) {
        if (vf.IsAlpha(request.Name)) {
            if (vf.IsNumeric(request.Duration)) {
                try {
                    const newSong = await Song.create({
                        Name: request.Name,
                        Duration: request.Duration,
                        CreatedAt: Date.now(),
                        UpdatedAt: Date.now(),
                        Deleted: false,
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
        if (vf.IsAlpha(request.Name) && vf.IsNumeric(request.Duration)) {
            try {
                const song = await Song.findOne({
                    where: {
                        Id: id,
                        Deleted: false,
                    },
                });
                song?.set({
                    Name: request.Name,
                    Duration: request.Duration,
                    UpdatedAt: Date.now(),
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
                    Id: id,
                    Deleted: false,
                },
            });
            song?.set({ Deleted: true });
            await song?.save();
            return new Result(200, 'Song deleted successfully', song);
        } catch (error) {
            return new Result(500, `Error deleting the song with id ${id}`, error);
        }
    }
    return new Result(400, 'The song id is invalid', null);
}
