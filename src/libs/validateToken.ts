import {Request,Response,NextFunction} from 'express';
import jwt from 'jsonwebtoken';

export interface IPayload {
    _id:string,
    iat:number,
    exp:number
}

export const tokenValidation = (req:Request,res:Response,next:NextFunction) =>{
    const token = req.header('token');
    if(!token) return res.status(400).json({message:'Invalid password'});
    const payload  = jwt.verify(token,process.env.TOKEN_SECRET || '2423503') as IPayload;
    req.userId = payload._id;
    next();
}