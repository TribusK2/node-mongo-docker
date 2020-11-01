import { Application } from 'express';

import { apiCreateBlog } from './apiCreateBlog';

export async function initAPI(app: Application): Promise<Application> {

  app.route('/api/blogs').post(apiCreateBlog);

  return new Promise((resolve, reject) => {
    resolve(app)
  })
}