import * as mongoose from "mongoose";
import { getLoggerWithConf } from "../logs/logger-conf";

const logger = getLoggerWithConf(`${__filename}`);

const uri: string = "mongodb://bloger:123zxc@my_mongo_service:27017/blog";

export async function connectDb() {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    logger.info("DB connected");
  }
  catch (err) {
    logger.error('Error on db connect ->', err.message);
  }
}
