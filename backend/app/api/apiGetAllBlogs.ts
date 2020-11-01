import { NextFunction, Request, Response } from 'express';

import { BlogModel } from "../db/model/initBlogModel";
import { getLoggerWithConf } from '../logs/logger-conf';

const logger = getLoggerWithConf(`${__filename}`);

export async function apiGetAllBlog(req: Request, res: Response, next: NextFunction) {

  try {
    const result = await BlogModel.find();
    logger.info(`Getting all blogs successfully`);
    res.status(200).send(result);
  }
  catch (err) {
    err.title = 'Error on getting all blogs';
    err.path = __filename;
    next(err);
  }

}