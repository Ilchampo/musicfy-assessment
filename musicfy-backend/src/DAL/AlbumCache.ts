import { appConfiguration } from '../Config';
import { Album, IAlbum } from '../DAL/Album';

export class AlbumCache {
    private maxAlbums: number;
    private totalAlbums: number;
    public albums: IAlbum[] | null;

    constructor() {
        this.maxAlbums = appConfiguration.albums.max;
        this.totalAlbums = 0;
        this.albums = null;
    }

    getMaxAlbums(): number {
        return this.maxAlbums;
    }
    getTotalAlbums(): number {
        return this.totalAlbums;
    }
    getAlbums(): IAlbum[] | null {
        return this.albums;
    }

    async initTotalAlbums() {
        try {
            this.totalAlbums = await Album.count({ where: { Deleted: false } });
        } catch (error) {
            this.totalAlbums = 0;
        }
    }

    addTotalAlbums(): void {
        this.totalAlbums += 1;
    }
    substractTotalAlbums(): void {
        this.totalAlbums -= 1;
    }
}
