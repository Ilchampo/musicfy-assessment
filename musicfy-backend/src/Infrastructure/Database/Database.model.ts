export interface IDatabase {
    Username: string;
    Password: string;
    Database: string;
    Host: string;
    Port: string | number;
    Dialect: string;
}

export class Database {
    private Username: string;
    private Password: string;
    private Database: string;
    private Host: string;
    private Port: string | number;
    private Dialect: string;

    constructor(
        Username: string,
        Password: string,
        Database: string,
        Host: string,
        Port: string | number,
        Dialect: string
    ) {
        this.Username = Username;
        this.Password = Password;
        this.Database = Database;
        this.Host = Host;
        this.Port = Port;
        this.Dialect = Dialect;
    }

    GetUsername(): string {
        return this.Username;
    }
    GetPassword(): string {
        return this.Password;
    }
    GetDatabase(): string {
        return this.Database;
    }
    GetHost(): string {
        return this.Host;
    }
    GetPort(): string | number {
        return this.Port;
    }
    GetDialect(): string {
        return this.Dialect;
    }
}
