import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';

// interface is like a contract in a app
// it defines the syntax for classes to follow.

// interface isn't converted to Javascript. It uses interface for typechecking. 
interface Post {
    userId: Number;
    id: Number;
    title: String;
    body: String;
}

// getting multiple post
const getPosts = async (req: Request, res: Response, nest: NextFunction) =>{
    let result: AxiosResponse = await axios.get("https://jsonplaceholder.typicode.com/posts");
    let posts: [Post] = result.data;
    return res.status(200).json({
        message: posts
    });
};

// getting single post
const getPost = async(req:Request, res: Response, next: NextFunction) =>{
    // get the post id
    let id: string = req.params.id;
    // get post
    let result: AxiosResponse = await axios.get("https://jsonplaceholder.typicode.com/posts/${id}");
    let post: Post = result.data;
    return res.status(200).json({
        message: post
    });
};

// update post -- ?? nullish coalescing
// 
const updatePost = async (req: Request, res: Response, next: NextFunction) => {
    let id: string = req.params.id;
    let title: string = req.body.title ?? null;
    let body: string = req.body.body ?? null;

    let response: AxiosResponse = await axios.put("https://jsonplaceholder.typicode.com/posts/${id}",{
        ...(title && { title}),
        ...(body && { body })
    });
    return res.status(200).json({
        message: response.data
    });
}