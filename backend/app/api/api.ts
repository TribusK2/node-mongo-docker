import { Application } from 'express';
import { appErrorHandler } from '../appErrorHandler';

import { getLoggerWithConf } from '../logger-conf';
import { blogsRoutesRegister } from './blogs/blogs.routes';

const logger = getLoggerWithConf(`${__filename}`);

export async function initAPI(app: Application): Promise<Application | undefined> {
  try {
    const blogRoutes = await blogsRoutesRegister(app);
    if(!blogRoutes) return;
    logger.info("'blogs' routes registered");

    return new Promise((resolve, reject) => {
      resolve(app)
    })
  } catch (err) {
    err.title = 'Error on API init ->';
    err.path = __filename;
    appErrorHandler(err);
  }
}