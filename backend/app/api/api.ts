import { Application, Response, Request } from 'express';

import { apiCreateBlog } from './apiCreateBlog';

export async function initAPI(app: Application): Promise<Application> {

  app.route('/api/blogs').post(apiCreateBlog);

  return new Promise((resolve, reject) => {
    app.route('/').get((req: Request, res: Response) => {
      res.status(200).send('<h1>Hello World!</h1>');
    });
    resolve(app)
  })
}