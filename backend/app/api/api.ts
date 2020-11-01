import { Application } from 'express';

import { apiCreateBlog } from './apiCreateBlog';
import { apiGetAllBlog } from './apiGetAllBlogs';

export async function initAPI(app: Application): Promise<Application> {

  app.route('/api/blogs').post(apiCreateBlog);
  app.route('/api/blogs').get(apiGetAllBlog);

  return new Promise((resolve, reject) => {
    resolve(app)
  })
}