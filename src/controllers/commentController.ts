import {Request,Response} from 'express';
import Comment, {IComment} from '../models/Comment';

export const getComments = async (req: Request,res: Response): Promise<Response>=>{
    const comments = await Comment.find();
    return res.status(200).json(comments);
}

export const setComments = async (req: Request,res: Response): Promise<Response>=>{
    const {comment, postId} = req.body;
    const {userId} = req;
    const newComment:IComment = new Comment({
        comment,
        postId,
        userId
    });
    try {
        await newComment.save();
        return res.status(201).json(newComment);
    } catch (error) {
        return res.status(500).json({message:'Internal Error'});
    }
}

export const getComment = async (req: Request, res: Response): Promise<Response> =>{
    const {id} = req.params;
    try {
        const comment = await Comment.findById(id);
        if(comment){
            return res.status(200).json(comment);
        }else{
            return res.status(404).json({message:'Not found'});
        }
    } catch (error) {
        return res.status(500).json({message:'Internal Error'});
    }
}

export const updateComment = async (req: Request,res:Response): Promise<Response>=>{
    const {id} = req.params;
    const {comment} = req.body;
    try {
        const comments = await Comment.findById(id);
        if(comments){
            comments.comment = comment;
            await comments.save();
            return res.status(201).json(comments);
        }else{
            return res.status(404).json({message:'Not found'});
        }
    } catch (error) {
        return res.status(500).json({message:'Internal Error'});
    }
}

export const deleteComment = async (req: Request, res:Response): Promise<Response> =>{
    const {id} = req.params;
    try {
        const comment = await Comment.findById(id);
        if(comment){
            await comment.remove();
            return res.status(201).json({message:'Deleted'});
        }else{
            return res.status(404).json({message:'Not found'});
        }
    } catch (error) {
        return res.status(500).json({message:'Internal Error'});
    }
}