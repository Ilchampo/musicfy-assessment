import { DataTypes } from 'sequelize';
import { sequelize } from '../Infrastructure/Database/Database';

export interface ISong {
    Id?: number;
    AlbumId?: number | string;
    Name?: string;
    Duration?: number;
    CreatedAt?: Date;
    UpdatedAt?: Date;
    Deleted?: boolean;
}

export const Song = sequelize.define(
    'Song',
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
        Duration: {
            type: DataTypes.INTEGER,
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
