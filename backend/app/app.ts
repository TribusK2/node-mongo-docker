import { AddressInfo } from 'net'
import * as mongoose from "mongoose";

import { connectDb } from './db/db-conn'
import { startServer } from './server/server'
import { appLogger } from './logger-conf';
import { appErrorHandler } from './appErrorHandler';

startApp();

async function startApp() {
  try {
    await connectDb();
    if (mongoose.connection.readyState === 0) return;

    const server = await startServer();
    if (!server) return;
    const address = server.address() as AddressInfo;
    appLogger.info(`${__filename} |`, `Server is running on port: ${address.port}`);
  } 
  catch (err) {
    err.title = 'Error on application start ->';
    err.path = __filename;
    appErrorHandler(err);
  };
}