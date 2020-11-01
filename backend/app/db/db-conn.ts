import * as mongoose from "mongoose";

import { getLoggerWithConf } from "../logs/logger-conf";

const logger = getLoggerWithConf(`${__filename}`);

const dbName = "blog";
const dbUser = "bloger";
const dbPass = "123zxc";
const uri: string = `mongodb://${dbUser}:${dbPass}@my_mongo_service:27017/${dbName}`;

export async function connectDb() {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    logger.info(`User '${dbUser}' to DB '${dbName}' connected`);
  }
  catch (err) {
    logger.error('Error on db connect ->', err.message);
  }
}
