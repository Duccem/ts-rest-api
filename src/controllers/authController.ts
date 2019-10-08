import {Request,Response} from 'express';
import User, {IUser} from '../models/User';
import jwt from 'jsonwebtoken';

export const signup = async (req:Request,res:Response) => {
    const {username,email,password} = req.body;
    const user: IUser = new User({
        username,
        email,
        password
    });
    user.password = await user.ecryptPassword(user.password);
    const saveUser = await user.save();

    const token:string = jwt.sign({_id:saveUser._id},process.env.TOKEN_SECRET || '2423503');
    res.header('token',token).json({saveUser});
}
export const signin = async (req:Request,res:Response)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email:email});
    if(!user){
        res.status(400).json({message:'Email or password is wrong'});
    }else{
        const validate:boolean = await user.validatePassword(password);
        if(!validate){
            res.status(400).json({message:'Invalid password'});
        }else{
            const token:string = jwt.sign({_id:user._id},process.env.TOKEN_SECRET || '2423503',{expiresIn:60*60*24});
            res.header('token',token).json(user);
        }
        
    }
}
export const profile = async (req:Request,res:Response)=>{
    const {userId} = req;
    const user = await User.findById(userId,{password:0});
    if(!user) return res.status(400).json({message:'No user found'});
    res.status(200).json(user);
}