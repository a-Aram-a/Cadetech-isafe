export class ApiError extends Error {
    status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}

export function errorHandler(err: any, req: any, res: any, next: any) {
    const status = err.status ?? 500;
    const message = err.message ?? 'Internal Server Error';
    console.log(err);
    res.status(status).send({ status, message });
}

export default function initErrors(app: any) {
    app.use(errorHandler);
}