import { AddressInfo } from 'net'
import * as mongoose from "mongoose";

import { connectDb } from './db/db'
import { startServer } from './server/server'
import { getLoggerWithConf } from './logs/logger-conf';

const logger = getLoggerWithConf(`${__filename}`);

startApp();

async function startApp() {
  try {
    await connectDb();
    const server = await startServer();
    if (server) {
      const address = server.address() as AddressInfo;
      logger.info(`Server is running on port: ${address.port}`);
    }
  } catch (err) {
    logger.error('Error on application start ->', err)
    await mongoose.connection.close();
    logger.warn("DB disconnected");
  };
}