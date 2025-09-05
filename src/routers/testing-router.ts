import {Request, Response, Router} from 'express';
import {dataRepository} from "../repository/blogger-repository";
import {HttpStatus} from "../core/http-statuses";

export const testingRouter = Router();

testingRouter.delete('/all-data', (req: Request, res: Response) => {
    dataRepository.deleteAllBloggers();
    res.sendStatus(HttpStatus.NoContent);
})