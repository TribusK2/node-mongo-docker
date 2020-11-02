import { NextFunction } from "express";
import * as mongoose from "mongoose";

import { getLoggerWithConf } from "./logs/logger-conf";

export async function appErrorHandler(err: any){

    const loggerPath = err.path || __filename;
    const logger = getLoggerWithConf(`${loggerPath}`);
    const errorTitle = err.title || "Unknow error ->";
    logger.error(errorTitle, err);

    const conn = mongoose.connection;
    await conn.close();
    if(conn.readyState === 0) logger.warn(`DB '${conn.name}' disconnected`);

}