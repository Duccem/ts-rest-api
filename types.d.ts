declare namespace Express {
    export interface Request {
        userId: string,
        file: {
            fieldname: string,
            originalname: string,
            encoding: string,
            mimtype:string,
            size:string,
            destination:string,
            filename:string,
            path:string,
            buffer:string
        }
    }
}