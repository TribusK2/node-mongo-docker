import * as express from 'express';
import { Application } from 'express';
import { Server } from 'http';
import * as bodyParser  from 'body-parser';

import { initAPI } from '../api/api'
import { getLoggerWithConf } from '../logs/logger-conf';
import { apiErrorHandler } from '../api/apiErrorHandler';
import { appErrorHandler } from '../appErrorHandler';

const logger = getLoggerWithConf(`${__filename}`);

const app: Application = express();
const port = 8090;

export async function startServer(): Promise<Server | undefined> {
  try {
    app.use(bodyParser.json());

    const apiInitalized = await initAPI(app);
    if(!apiInitalized) return;
    logger.info('API initialized');

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
