import { Response } from 'express';

import { getLoggerWithConf } from '../logs/logger-conf';

export function onSuccess(res: Response, data: any, message?: string, path?: string) {
  if (path && message) {
    const logger = getLoggerWithConf(`${path}`);
    logger.info("API INFO ->", `${message}`);
  };

  res.status(200).json({ payload: data });
}