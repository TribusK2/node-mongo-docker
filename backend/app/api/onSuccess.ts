import { Response } from 'express';

import { apiLogger } from '../logger-conf';

export function onSuccess(res: Response, data: any, message?: string, path?: string) {
  if (path && message) {
    apiLogger.info(`${path} | API INFO ->`, `${message}`);
  };

  res.status(200).json({ payload: data });
}