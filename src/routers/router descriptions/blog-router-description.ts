import {Request, Response} from "express";
import {HttpStatus} from "../../core/http-statuses";
import {dataRepository} from "../../repository/blogger-repository";

export const getAllBlogs = (req:Request, res:Response) => {
    res.status(HttpStatus.Ok).json(dataRepository.getAllBlogs());
};

export const createNewBlog = (req: Request, res: Response) => {
    res.status(HttpStatus.Created).json(dataRepository.createNewBlog(req.body));
};

export const findSingleBlog = (req: Request, res: Response) => {
    const result = dataRepository.findSingleBlog(req.params.id);

    if(result === undefined)
    {
        res.sendStatus(HttpStatus.NotFound);
    }

    res.status(HttpStatus.Ok).json(result);
};

export const updateBlog = (req: Request, res: Response) => {
    const result = dataRepository.updateBlog(req.params.id, req.body);

    if(result === undefined)
    {
        res.sendStatus(HttpStatus.NotFound);
    }

    res.sendStatus(HttpStatus.NoContent);
};

export const deleteBlog = (req: Request, res: Response) => {
    const result = dataRepository.deleteBlog(req.params.id);

    if(result === undefined)
    {
        res.sendStatus(HttpStatus.NotFound);
    }

    res.sendStatus(HttpStatus.NoContent);
};