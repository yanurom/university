import { logger } from "../common/logger";

export const uncaughtException = async (error: Error) => {
  const { name, message } = error;

  logger.error(`
  time:            ${new Date()}
  errorName:       ${name}
  errorMessage:    ${message}\n
  `);

  process.exit(1);
};

export const unhandledRejection = async (error: Error, promise: Promise<any>) => {
  const { message } = error;

  logger.error(`
  time:                   ${new Date()}
    unhandledRejection:     ${JSON.stringify(promise)}
    errorMessage:           ${message}\n
  `);
  process.exit(1);
};
