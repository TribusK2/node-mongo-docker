import { Request, Response } from 'express';

import { BlogModel } from "../db/model/initBlogModel";
import { getLoggerWithConf } from '../logs/logger-conf';

const logger = getLoggerWithConf(`${__filename}`);

export async function apiGetBlogById(req: Request, res: Response) {

  try {
    const blogId = req.params.id.toString();

    const result = await BlogModel.findById(blogId);
    if (result) {
      logger.info(`Blog with Id '${result.toJSON()._id}' get successfully`);
      res.status(200).send(result);
    }else{
      throw new Error(`Couldn't find blog with Id '${blogId}' in DB`)
    }
  }
  catch (err) {
    logger.error('Error on getting blog ->', err);
  }

}