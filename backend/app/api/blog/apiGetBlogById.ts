import { NextFunction, Request, Response } from 'express';
import * as mongoose from "mongoose";

import { Blog } from '../../../model/blog-model';
import { ErrorBlock } from '../../../model/error-block-model';
import { BlogModel } from "../../db/model/initBlogModel";
import { mongoIdValidation } from '../../service/validation-service';
import { onSuccess } from '../onSuccess';

export async function apiGetBlogById(req: Request, res: Response, next: NextFunction) {

  try {
    const blogId = req.params.id.toString();
    mongoIdValidation(blogId);

    const resultObj = await BlogModel.findById(blogId).lean() as Blog;
    if (resultObj) {
      const successMessage = `Blog with Id '${resultObj._id}' get successfully from DB`;
      onSuccess(res, resultObj, successMessage, __filename);
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