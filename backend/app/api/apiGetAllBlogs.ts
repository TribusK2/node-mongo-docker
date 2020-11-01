import { Request, Response } from 'express';

import { BlogModel } from "../db/initBlogModel";
import { getLoggerWithConf } from '../logs/logger-conf';

const logger = getLoggerWithConf(`${__filename}`);

export async function apiGetAllBlog(req: Request, res: Response) {

  try {
    const result = await BlogModel.find();
    logger.info(`Getting all blogs successfully`);
    
    res.status(200).send(result);
  }
  catch (err) {
    logger.error('Error on getting all blogs ->', err);
  }

}