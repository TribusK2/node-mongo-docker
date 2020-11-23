import * as mongoose from "mongoose";

import { appErrorHandler } from "../appErrorHandler";
import { appLogger } from "../logger-conf";

const dbName = "blog";
const dbUser = "bloger";
const dbPass = "123zxc";
const uri: string = `mongodb://${dbUser}:${dbPass}@my_mongo_service:27017/${dbName}`;

export async function connectDb() {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
    appLogger.info(`${__filename} |`, `User '${dbUser}' to DB '${dbName}' connected`);
  }
  catch (err) {
    err.title = 'Error on db connect ->';
    err.path = __filename;
    appErrorHandler(err);
  }
}
