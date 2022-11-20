import { Sequelize } from 'sequelize';
import { DatabaseConfiguration } from './Database.config';

const databaseConfiguration = DatabaseConfiguration();

const sequelizeConfiguration: any = {
    username: databaseConfiguration.GetUsername(),
    password: databaseConfiguration.GetPassword(),
    database: databaseConfiguration.GetDatabase(),
    host: databaseConfiguration.GetHost(),
    port: databaseConfiguration.GetPort(),
    dialect: databaseConfiguration.GetDialect(),
    logging: false,
};

export const sequelize = new Sequelize(sequelizeConfiguration);
