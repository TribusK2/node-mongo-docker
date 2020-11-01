import { Request, Response } from 'express';

import { BlogModel } from "../db/initBlogModel";
import { Blog } from "../../shared/model/blog-model";
import { getLoggerWithConf } from '../logs/logger-conf';

const logger = getLoggerWithConf(`${__filename}`);

export async function apiCreateBlog(req: Request, res: Response) {

  try {
    const reqBody: Blog = req.body;

    const newBlog = new BlogModel({
      title: reqBody.title,
      snippet: reqBody.snippet,
      body: reqBody.body
    });

    const result = await newBlog.save();
    logger.info(`New blog '${newBlog.toJSON().title}' created`);

    res.status(200).send(result);
  }
  catch (err) {
    logger.error('Error on create blog ->', err);
  }

}