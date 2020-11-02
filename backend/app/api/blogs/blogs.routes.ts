import { Application } from 'express';

import { appErrorHandler } from '../../appErrorHandler';
import { apiCreateBlog } from './apiCreateBlog';
import { apiGetAllBlog } from './apiGetAllBlogs';
import { apiGetBlogById } from './apiGetBlogById';

export async function blogsRoutesRegister(app: Application): Promise<Application | undefined> {
  try {
    app.route('/api/blogs').post(apiCreateBlog);
    app.route('/api/blogs').get(apiGetAllBlog);
    app.route('/api/blogs/:id').get(apiGetBlogById);

    return new Promise((resolve, reject) => {
      resolve(app)
    })
  } catch (err){
    err.title = "Error on 'blogs' routes registration ->";
    err.path = __filename;
    appErrorHandler(err);
  }
}