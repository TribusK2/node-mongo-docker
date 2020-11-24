import * as express from 'express';
import { Application } from 'express';
import { Server } from 'http';
import * as bodyParser  from 'body-parser';

import { initAPI } from '../api/api'
import { appLogger } from '../logger-conf';
import { apiErrorHandler } from '../api/apiErrorHandler';
import { appErrorHandler } from '../appErrorHandler';

const app: Application = express();
const port = 8090;

/**
 * Setup server
 * @returns Promise
 */
export async function startServer(): Promise<Server | undefined> {
  try {
    app.use(bodyParser.json());

    const apiInitalized = await initAPI(app);
    if(!apiInitalized) return;
    appLogger.info(`${__filename} |`, 'API initialized');

    app.use(apiErrorHandler);

    return new Promise((resolve, reject) => {
      const server = app.listen(port);
      resolve(server);
    })
  }
  catch (err) {
    err.title = 'Error on server start ->';
    err.path = __filename;
    appErrorHandler(err);
  }
}
