export interface IDatabase {
    Username: string;
    Password: string;
    Database: string;
    Host: string;
    Port: string | number;
    Dialect: string;
}

export class Database {
    private username: string;
    private password: string;
    private database: string;
    private host: string;
    private port: string | number;
    private dialect: string;

    constructor(
        username: string,
        password: string,
        database: string,
        host: string,
        port: string | number,
        dialect: string
    ) {
        this.username = username;
        this.password = password;
        this.database = database;
        this.host = host;
        this.port = port;
        this.dialect = dialect;
    }

    GetUsername(): string {
        return this.username;
    }
    GetPassword(): string {
        return this.password;
    }
    GetDatabase(): string {
        return this.database;
    }
    GetHost(): string {
        return this.host;
    }
    GetPort(): string | number {
        return this.port;
    }
    GetDialect(): string {
        return this.dialect;
    }
}
