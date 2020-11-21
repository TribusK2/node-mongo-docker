import * as mongoose from "mongoose";

import { appErrorHandler } from "../appErrorHandler";
import { getLoggerWithConf } from "../logger-conf";

const logger = getLoggerWithConf(`${__filename}`);

const dbName = "blog";
const dbUser = "bloger";
const dbPass = "123zxc";
const uri: string = `mongodb://${dbUser}:${dbPass}@my_mongo_service:27017/${dbName}`;

export async function connectDb() {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
    logger.info(`User '${dbUser}' to DB '${dbName}' connected`);
  }
  catch (err) {
    err.title = 'Error on db connect ->';
    err.path = __filename;
    appErrorHandler(err);
  }
}
