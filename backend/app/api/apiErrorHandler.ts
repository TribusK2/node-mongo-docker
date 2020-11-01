import { Request, Response, NextFunction } from 'express';

import { ErrorBlock } from '../../shared/model/error-block-model';
import { getLoggerWithConf } from '../logs/logger-conf';

const logger = getLoggerWithConf(`${__filename}`);

export function apiErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {

    logger.error("Api error handler triggered ->", err);

    let errorBlock: ErrorBlock = {
        status: 500,
        title: "Internal server error",
        message: "Unexpected error",
    }
    
    if(err.title) errorBlock.title = err.title;
    if(err.message) errorBlock.message = err.message;

    if (err.status === 404){
        errorBlock.status = err.status;
        res.status(404).json(errorBlock);
        return next();
    }

    res.status(500).json(errorBlock);
    next();
}