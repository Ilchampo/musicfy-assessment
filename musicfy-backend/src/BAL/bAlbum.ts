import * as vf from '../Helpers/ValidateFields';
import { Album, IAlbum } from '../DAL/Album';
import { Result } from '../DAL/Result';

export async function GetAllAlbums(): Promise<Result> {
    try {
        const albums = await Album.findAll({
            where: {
                Deleted: false,
            },
            order: [['CreatedAt', 'DESC']],
        });
        return new Result(200, 'All albums retrieved correctly', albums);
    } catch (error) {
        return new Result(500, 'Error getting all the albums', error);
    }
}

export async function CreateAlbum(request: IAlbum): Promise<Result> {
    if (vf.IsAlpha(request.Name) && vf.IsAlpha(request.Artist)) {
        if (vf.IsBetweenDates(request.Year)) {
            try {
                const newAlbum = await Album.create({
                    Name: request.Name,
                    Artist: request.Artist,
                    Year: request.Year,
                    ImageUrl: request.ImageUrl,
                    CreatedAt: Date.now(),
                    UpdatedAt: Date.now(),
                    Deleted: false,
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
                    Id: id,
                    Deleted: false,
                },
            });
            return new Result(200, 'All album retrieved correctly', album);
        } catch (error) {
            return new Result(500, `Error getting the album with id ${id}`, error);
        }
    }
    return new Result(400, 'The album id is invalid', null);
}

export async function EditAlbumById(id: any, request: IAlbum): Promise<Result> {
    if (vf.IsNumeric(id)) {
        if (vf.IsAlpha(request.Name) && vf.IsAlpha(request.Artist)) {
            if (vf.IsBetweenDates(request.Year)) {
                try {
                    const album = await Album.findOne({
                        where: {
                            Id: id,
                            Deleted: false,
                        },
                    });
                    album?.set({
                        Name: request.Name,
                        Artist: request.Artist,
                        Year: request.Year,
                        ImageUrl: request.ImageUrl,
                        UpdatedAt: Date.now(),
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
                    Id: id,
                    Deleted: false,
                },
            });
            album?.set({ Deleted: true });
            await album?.save();
            return new Result(200, 'Album deleted successfully', album);
        } catch (error) {
            return new Result(500, `Error deleting the album with id ${id}`, error);
        }
    }
    return new Result(400, 'The album id is invalid', null);
}
