import { AddressInfo } from 'net'
import * as mongoose from "mongoose";

import { connectDb } from './db/db'
import { startServer } from './server/server'
import { blogModel } from './db/blog-dbModel';

startApp();

async function startApp() {
  try {
    await connectDb();
    const server = await startServer();
    if (server) {
      const address = server.address() as AddressInfo;
      console.log(`Server is running on port: ${address.port}`);
    }
  } catch (err) {
    console.log('Error on application start -> ', err)
    await mongoose.connection.close();
    console.log("DB disconnected");
  };
}