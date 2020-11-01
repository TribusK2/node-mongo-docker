import { NextFunction, Request, Response } from 'express';

import { ErrorBlock } from '../../shared/model/error-block-model';
import { BlogModel } from "../db/model/initBlogModel";
import { onSuccess } from './onSuccess';

export async function apiGetBlogById(req: Request, res: Response, next: NextFunction) {

  try {
    const blogId = req.params.id.toString();

    const result = await BlogModel.findById(blogId);
    
    if (result) {
      const successMessage = `Blog with Id '${result.toJSON()._id}' get successfully from DB`;
      onSuccess(res, result, successMessage, __filename);
    }else{
      const error: Partial<ErrorBlock> = {
        status: 404,
        message: `Couldn't find blog with Id '${blogId}' in DB`
      }
      throw error;
    }
  }
  catch (err) {
    err.title = 'Error on getting blog';
    err.path = __filename;
    next(err);
  }

}