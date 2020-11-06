import { Request, Response, NextFunction } from 'express';

import { ErrorBlock } from '../../model/error-block-model';
import { getLoggerWithConf } from '../logger-conf';

export function apiErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {

    const loggerPath = err.path || __filename;
    const logger = getLoggerWithConf(`${loggerPath}`);
    err.message? logger.error("API ERROR ->", err.message) : logger.error("API ERROR ->", err);

    let errorBlock: ErrorBlock = {
        status: 500,
        title: "Internal server error",
        message: "Unexpected error",
    };
    
    if(err.title) errorBlock.title = err.title;
    if(err.message) errorBlock.message = err.message;

    if (err.status === 404){
        errorBlock.status = err.status;
        res.status(404).json(errorBlock);
        return next();
    }

    res.status(500).json(errorBlock);
    return next();
}