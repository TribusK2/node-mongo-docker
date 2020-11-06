import { NextFunction, Request, Response } from 'express';
import { Blog } from '../../../model/blog-model';

import { BlogModel } from "../../db/model/initBlogModel";
import { onSuccess } from '../onSuccess';

export async function apiGetAllBlog(req: Request, res: Response, next: NextFunction) {

  try {
    const resultObj = await BlogModel.find().lean() as Blog[];
    const successMessage = `All blogs get successfully from DB`;
    onSuccess(res, resultObj, successMessage, __filename);
  }
  catch (err) {
    err.title = 'Error on getting all blogs';
    err.path = __filename;
    next(err);
  }

}