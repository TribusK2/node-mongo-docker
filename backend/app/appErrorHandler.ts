import * as mongoose from "mongoose";

import { appLogger } from "./logger-conf";

export async function appErrorHandler(err: any) {

    const loggerPath = err.path || __filename;
    const errorTitle = err.title || "Unknow error ->";
    appLogger.fatal(`${loggerPath} |`, errorTitle, err);

    const conn = mongoose.connection;
    await conn.close();
    if (conn.readyState === 0) appLogger.warn(`${loggerPath} |`, `DB '${conn.name}' disconnected`);

}