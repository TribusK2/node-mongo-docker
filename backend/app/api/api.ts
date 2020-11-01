import { Application } from 'express';

import { apiCreateBlog } from './apiCreateBlog';
import { apiGetAllBlog } from './apiGetAllBlogs';
import { apiGetBlogById } from './apiGetBlogById';

export async function initAPI(app: Application): Promise<Application> {

  app.route('/api/blogs').post(apiCreateBlog);
  app.route('/api/blogs').get(apiGetAllBlog);
  app.route('/api/blogs/:id').get(apiGetBlogById);

  return new Promise((resolve, reject) => {
    resolve(app)
  })
}