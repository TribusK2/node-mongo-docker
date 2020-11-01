import { NextFunction, Request, Response } from 'express';

import { BlogModel } from "../db/model/initBlogModel";
import { Blog } from "../../shared/model/blog-model";
import { getLoggerWithConf } from '../logs/logger-conf';

const logger = getLoggerWithConf(`${__filename}`);

export async function apiCreateBlog(req: Request, res: Response, next: NextFunction) {

  try {
    const reqBody: Blog = req.body;

    const newBlog = new BlogModel({
      title: reqBody.title,
      snippet: reqBody.snippet,
      body: reqBody.body
    });

    const result = await newBlog.save();
    logger.info(`New blog '${result.toJSON().title}' created`);

    res.status(200).send(result);
  }
  catch (err) {
    err.title = 'Error on create blog';
    err.path = __filename;
    next(err);
  }

}