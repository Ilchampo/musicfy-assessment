export class Result {
    public status: number;
    public message: string;
    public payload?: any;

    constructor(status: number, message: string, payload: any) {
        this.status = status;
        this.message = message;
        this.payload = payload || null;
    }
}
