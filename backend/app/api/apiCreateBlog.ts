import { NextFunction, Request, Response } from 'express';

import { BlogModel } from "../db/model/initBlogModel";
import { Blog } from "../../shared/model/blog-model";
import { onSuccess } from './onSuccess';

export async function apiCreateBlog(req: Request, res: Response, next: NextFunction) {

  try {
    const reqBody: Blog = req.body;

    const newBlog = new BlogModel({
      title: reqBody.title,
      snippet: reqBody.snippet,
      body: reqBody.body
    });

    const result = await newBlog.save();

    const successMessage = `New blog '${result.toJSON().title}' created successfully in DB`;
    onSuccess(res, result, successMessage, __filename);
  }
  catch (err) {
    err.title = 'Error on create blog';
    err.path = __filename;
    next(err);
  }

}