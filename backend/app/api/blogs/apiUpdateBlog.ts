import { NextFunction, Request, Response } from 'express';

import { BlogModel } from "../../db/model/initBlogModel";
import { Blog } from "../../../model/blog-model";
import { onSuccess } from '../onSuccess';
import { ErrorBlock } from '../../../model/error-block-model';

export async function apiUpdateBlog(req: Request, res: Response, next: NextFunction) {

  try {
    const blogId = req.params.id.toString();
    const reqBody: Blog = req.body;

    const resultObj = await BlogModel.findByIdAndUpdate(blogId, reqBody, {new: true});
    if (resultObj) {
      const successMessage = `Blog with Id '${resultObj._id}' updated successfully`;
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
    err.title = 'Error on update blog';
    err.path = __filename;
    next(err);
  }

}