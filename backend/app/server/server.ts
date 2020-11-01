import * as express from 'express';
import { Application } from 'express';
import { Server } from 'http';
import * as bodyParser  from 'body-parser';

import { initAPI } from '../api/api'
import { getLoggerWithConf } from '../logs/logger-conf';

const logger = getLoggerWithConf(`${__filename}`);

const app: Application = express();
const port = 8090;

export async function startServer(): Promise<Server | undefined> {
  try {
    app.use(bodyParser.json());
    
    await initAPI(app);
    logger.info('API initialized')

    return new Promise((resolve, reject) => {
      const server = app.listen(port);
      resolve(server);
    })
  }
  catch (err) {
    logger.error('Error on server start ->', err);
  }
}
