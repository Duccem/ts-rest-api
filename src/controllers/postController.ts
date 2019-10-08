import {Request,Response} from 'express';
import fs from 'fs-extra';
import Post, {IPost} from '../models/Post';

export const getPosts = async (req: Request, res: Response): Promise<Response>=>{
    const posts = await Post.find();
    return res.status(200).json(posts);
}

export const setPost = async (req:Request, res:Response): Promise<Response> =>{
    const {title,description} = req.body; 
    const {userId} = req;
    const {filename} = req.file;
    const newPost:IPost = new Post({
        title,
        description,
        image:filename,
        userId
    });
    try {
        await newPost.save();
        return res.status(201).json(newPost);
    } catch (error) {
        return res.status(500).json({message:'Internal Error'});
    }
    
}

export const getPost = async (req: Request, res: Response): Promise<Response> =>{
    const {id} = req.params;
    try {
        const post = await Post.findById(id);
        if(post){
            return res.status(200).json(post);
        }else{
            return res.status(404).json({message:'Not found'});
        }
    } catch (error) {
        return res.status(500).json({message:'Internal Error'});
    }
}

export const updatePost = async (req: Request,res:Response): Promise<Response>=>{
    const {id} = req.params;
    const {title,description} = req.body;
    const {filename,path} = req.file;

    try {
        const post = await Post.findById(id);
        if(post){
            await fs.unlink(post.path);
            post.title = title;
            post.description = description;
            post.image = filename;
            post.path = path;
            await post.save();
            return res.status(201).json(post);
        }else{
            return res.status(404).json({message:'Not found'});
        }
    } catch (error) {
        return res.status(500).json({message:'Internal Error'});
    }
}

export const deletePost = async (req: Request, res:Response): Promise<Response> =>{
    const {id} = req.params;
    try {
        const post = await Post.findById(id);
        if(post){
            await fs.unlink(post.path);
            await post.remove();
            return res.status(201).json({message:'Deleted'});
        }else{
            return res.status(404).json({message:'Not found'});
        }
    } catch (error) {
        return res.status(500).json({message:'Internal Error'});
    }
}