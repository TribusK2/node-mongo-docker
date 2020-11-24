import { Application } from 'express';

import { appErrorHandler } from '../../appErrorHandler';
import { apiCreateBlog, apiGetAllBlog, apiGetBlogById, apiRemoveBlog, apiUpdateBlog } from '../controllers/blog.controller';

/**
 * Define and register 'blog' routes in the app
 * @param  {Application} app
 * @param  {string} routeUrl
 * @returns Promise
 */
export async function blogsRouteRegister(app: Application, routeUrl: string): Promise<Application | undefined> {
  try {
    app.route(`${routeUrl}/`).post(apiCreateBlog);
    app.route(`${routeUrl}/`).get(apiGetAllBlog);
    app.route(`${routeUrl}/:id`).get(apiGetBlogById);
    app.route(`${routeUrl}/:id`).put(apiUpdateBlog);
    app.route(`${routeUrl}/:id`).delete(apiRemoveBlog);

    return new Promise((resolve, reject) => {
      resolve(app);
    })
  } catch (err) {
    err.title = `Error on '${routeUrl}' route registration ->`;
    err.path = __filename;
    appErrorHandler(err);
  }
}
