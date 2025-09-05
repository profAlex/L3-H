import {Request, Response} from "express";
import {HttpStatus} from "../../core/http-statuses";
import {dataRepository} from "../../repository/blogger-repository";


export const getAllPosts= (req:Request, res:Response) => {
    res.status(HttpStatus.Ok).json(dataRepository.getAllPosts());
};

export const createNewPost= (req:Request, res:Response) => {
    res.status(HttpStatus.Created).json(dataRepository.createNewPost(req.body));
};

export const findSinglePost= (req:Request, res:Response) => {
    const result = dataRepository.findSinglePost(req.params.id);

    if(result === undefined)
    {
        res.sendStatus(HttpStatus.NotFound);
    }

    res.status(HttpStatus.Ok).json(result);
};

export const updatePost= (req:Request, res:Response) => {
    const result = dataRepository.updatePost(req.params.id, req.body);

    if(result === undefined)
    {
        res.sendStatus(HttpStatus.NotFound);
    }

    res.sendStatus(HttpStatus.NoContent);
};

export const deletePost = (req:Request, res:Response) => {
    const result = dataRepository.deletePost(req.params.id);

    if(result === undefined)
    {
        res.sendStatus(HttpStatus.NotFound);
    }

    res.sendStatus(HttpStatus.NoContent);
};