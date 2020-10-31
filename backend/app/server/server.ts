import * as express from 'express';
import { Application } from 'express';
import { Server } from 'http';

import { initAPI } from '../api/api'

const app: Application = express();
const port = 8090;

export async function startServer(): Promise<Server | undefined> {
  try {
    await initAPI(app);
    console.log('API initialized')

    return new Promise((resolve, reject) => {
      const server = app.listen(port);
      resolve(server);
    })
  }
  catch (err) {
    console.log('Error on server start -> ', err);
  }
}
