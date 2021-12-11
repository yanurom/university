import { NextFunction, Request, Response } from 'express';
import { logger } from '../common/logger';
import config from '../common/config';

const { PORT } = config;

export const logging = async (req: Request, res: Response, next: NextFunction) => {

  try {
    logger.http(`
    method:           ${req.method}
    url:              ${`http://localhost:${PORT}${req.baseUrl + req.url}`}
    body:             ${JSON.stringify(req.body)}
    query:            ${JSON.stringify(req.query)}
    params:           ${JSON.stringify(req.params)}
    status code:      ${res.statusCode}\n
    `)
  } catch (error) {
    // @ts-ignore
    logger.error(error.message);
    process.exit(1);
  }
  next();
};
