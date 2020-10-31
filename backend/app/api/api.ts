import { Application, Response, Request } from 'express';

export function initAPI(app: Application): Promise<Application> {
  return new Promise((resolve, reject) => {
    app.route('/').get((req: Request, res: Response) => {
      res.status(200).send('<h1>Hello World!</h1>');
    });
    resolve(app)
  })
}