import { NextFunction, Request, Response } from 'express';

import { ErrorBlock } from '../../shared/model/error-block-model';
import { BlogModel } from "../db/model/initBlogModel";
import { getLoggerWithConf } from '../logs/logger-conf';

const logger = getLoggerWithConf(`${__filename}`);

export async function apiGetBlogById(req: Request, res: Response, next: NextFunction) {

  try {
    const blogId = req.params.id.toString();

    const result = await BlogModel.findById(blogId);
    if (result) {
      logger.info(`Blog with Id '${result.toJSON()._id}' get successfully`);
      res.status(200).send(result);
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