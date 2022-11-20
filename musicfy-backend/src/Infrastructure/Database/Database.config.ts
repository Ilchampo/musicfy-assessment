import * as dotenv from 'dotenv';
import { Database } from './Database.model';
import { appConfiguration } from '../../Config';

dotenv.config();

export const DatabaseConfiguration = () => {
    switch (appConfiguration.app.environment) {
        case 'development':
            const databaseConfiguration: Database = new Database(
                process.env.DB_USERNAME || 'root',
                process.env.DB_PASSWORD || 'password',
                process.env.DB_DATABASE || 'database',
                process.env.DB_HOST || 'localhost',
                process.env.DB_PORT || '3306',
                process.env.DB_DIALECT || 'mariadb'
            );
            return databaseConfiguration;
    }
    return new Database('user', 'password', 'database', 'host', 'port', 'dialect');
};
