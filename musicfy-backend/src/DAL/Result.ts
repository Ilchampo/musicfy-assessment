export class Result {
    public Status: number;
    public Message: string;
    public Payload?: any;

    constructor(status: number, message: string, payload: any) {
        this.Status = status;
        this.Message = message;
        this.Payload = payload || null;
    }
}
