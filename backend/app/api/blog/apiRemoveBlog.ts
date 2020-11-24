import { NextFunction, Request, Response } from 'express';

import { BlogModel } from "../../db/model/initBlogModel";
import { onSuccess } from '../onSuccess';
import { ErrorBlock } from '../../../model/error-block-model';
import { mongoIdValidation } from '../../service/validation-service';

export async function apiRemoveBlog(req: Request, res: Response, next: NextFunction) {

  try {
    const blogId = req.params.id.toString();
    mongoIdValidation(blogId);

    const resultObj = await BlogModel.findByIdAndDelete(blogId);
    if (resultObj) {
      const successMessage = `Blog with Id '${resultObj._id}' removed successfully`;
      const successObj = {
        result: 'OK',
        message: successMessage
      };
      onSuccess(res, successObj, successMessage, __filename);
    }else{
      const error: Partial<ErrorBlock> = {
        status: 404,
        message: `Couldn't find blog with Id '${blogId}' in DB`
      }
      throw error;
    }
  }
  catch (err) {
    err.title = 'Error on remove blog';
    err.path = __filename;
    next(err);
  }

}