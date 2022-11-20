import { DataTypes } from 'sequelize';
import { sequelize } from '../Infrastructure/Database/Database';
import { Song } from './Song';

export interface IAlbum {
    Id?: number;
    Name?: string;
    Artist?: string;
    Year?: number;
    ImageUrl?: string;
    CreatedAt?: Date;
    UpdatedAt?: Date;
    Deleted?: boolean;
};

export const Album = sequelize.define(
    'Album',
    {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        Name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Artist: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Year: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ImageUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        CreatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        UpdatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        Deleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    { timestamps: false }
);

Album.hasMany(Song, {
    foreignKey: 'AlbumId',
    sourceKey: 'Id',
});
Song.belongsTo(Album, { foreignKey: 'AlbumId', targetKey: 'Id' });
