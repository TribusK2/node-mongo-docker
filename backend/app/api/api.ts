import { Application } from 'express';
import { appErrorHandler } from '../appErrorHandler';

import { appLogger } from '../logger-conf';
import { blogsRouteRegister } from './routes/blog.routes';

const apiMainRoute = '/api';

/**
 * Setup all routes of the app
 * @param  {Application} app
 * @returns Promise
 */
export async function initAPI(app: Application): Promise<Application | undefined> {
  try {
    const routes = [
      routeRegister(app, '/blog', blogsRouteRegister)
    ]
    const registredRoutes = await Promise.all(routes);
    for (const route of registredRoutes) {
      if(!route) return;
    }

    return new Promise((resolve, reject) => {
      resolve(app)
    })
  } catch (err) {
    err.title = 'Error on API init ->';
    err.path = __filename;
    appErrorHandler(err);
  }
}

/**
 * Common function to register any route
 * @param  {Application} app
 * @param  {string} routeUrl
 * @param  {Function} registerFunction
 * @returns Promise
 */
async function routeRegister(app: Application, routeUrl: string, registerFunction: Function): Promise<Application | undefined> {
  try {
    const route = await registerFunction(app, `${apiMainRoute}${routeUrl}`);
    if (!route) return;
    appLogger.info(`${__filename} |`, `'${apiMainRoute}${routeUrl}' route registred`);

    return new Promise((resolve, reject) => {
      resolve(app)
    })
  } catch (err) {
    err.title = `Error on '${apiMainRoute}${routeUrl}' route registration ->`;
    err.path = __filename;
    appErrorHandler(err);
  }
}