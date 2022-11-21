import { DataTypes } from 'sequelize';
import { sequelize } from '../Infrastructure/Database/Database';
import { Song } from './Song';

export interface IAlbum {
    id?: number;
    name?: string;
    artist?: string;
    year?: number;
    imageUrl?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deleted?: boolean;
}

export const Album = sequelize.define(
    'Album',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        artist: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    { timestamps: false }
);

Album.hasMany(Song, {
    foreignKey: 'albumId',
    sourceKey: 'id',
});
Song.belongsTo(Album, { foreignKey: 'albumId', targetKey: 'id' });
