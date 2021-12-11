import { NextFunction, Request, Response } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';import { logger } from '../common/logger';
;

export const errorHandling = async (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const { name, message } = error;
  const statusCode = name === 'Error' ? StatusCodes.NOT_FOUND : StatusCodes.INTERNAL_SERVER_ERROR;
  const messageReason = getReasonPhrase(statusCode);

  try {
    logger.error(`
     status code:     ${statusCode}
     errorName:       ${name}
     errorMessage:    ${message}
     `);

    // status code:     ${statusCode}
    //   errorName:       ${name}
    //   errorMessage:    ${message}
  } catch (er) {
    // @ts-ignore
    process.exit(1);
  }

  return res.status(statusCode).json({ statusCode, messageReason });
};
