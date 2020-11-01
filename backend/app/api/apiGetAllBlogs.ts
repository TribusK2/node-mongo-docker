import { NextFunction, Request, Response } from 'express';

import { BlogModel } from "../db/model/initBlogModel";
import { onSuccess } from './onSuccess';

export async function apiGetAllBlog(req: Request, res: Response, next: NextFunction) {

  try {
    const result = await BlogModel.find();

    const successMessage = `All blogs get successfully from DB`;
    onSuccess(res, result, successMessage, __filename);
  }
  catch (err) {
    err.title = 'Error on getting all blogs';
    err.path = __filename;
    next(err);
  }

}