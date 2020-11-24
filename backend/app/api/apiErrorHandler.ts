import { Request, Response, NextFunction } from 'express';

import { ErrorBlock } from '../../model/error-block-model';
import { apiLogger } from '../logger-conf';

/**
 * Errors handle, occurred on api operation.
 * @param  {any} err
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @returns void
 */
export function apiErrorHandler(err: any, req: Request, res: Response, next: NextFunction): void {

    const loggerPath = err.path || __filename;
    err.message? apiLogger.error(`${loggerPath} | API ERROR ->`, err.message) : apiLogger.error(`${loggerPath} | API ERROR ->`, err);

    let errorBlock: ErrorBlock = {
        status: 500,
        title: "Internal server error",
        message: "Unexpected error",
    };
    
    if(err.title) errorBlock.title = err.title;
    if(err.message) errorBlock.message = err.message;

    if (err.status === 400){
        errorBlock.status = err.status;
        res.status(400).json(errorBlock);
        return next();
    }

    if (err.status === 404){
        errorBlock.status = err.status;
        res.status(404).json(errorBlock);
        return next();
    }

    res.status(500).json(errorBlock);
    return next();
}