import { Request, Response } from 'express';

import { blogModel } from "../db/blog-dbModel";
import { Blog } from "../../shared/model/blog-model";

export async function apiCreateBlog(req: Request, res: Response) {

  try {
    const reqBody: Blog = req.body;
    const Blog = blogModel();

    const newBlog = new Blog({
      title: reqBody.title,
      snippet: reqBody.snippet,
      body: reqBody.body
    });

    const result = await newBlog.save();
    console.log('New blog created')
    res.status(200).send(result);
  }
  catch (err) {
    console.log('Error on create blog -> ', err);
  }


}