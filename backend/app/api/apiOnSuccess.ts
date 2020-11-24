import { RequestHandler, Response } from 'express';

import { apiLogger } from '../logger-conf';

/**
 * Send success api response to client
 * @param  {Response} res
 * @param  {any} data
 * @param  {string} message?
 * @param  {string} path?
 * @returns Response
 */
export function apiOnSuccess(res: Response, data: any, message?: string, path?: string): Response<RequestHandler> {
  if (path && message) {
    apiLogger.info(`${path} | API INFO ->`, `${message}`);
  };

  return res.status(200).json({ payload: data });
}