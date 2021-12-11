import winston, {format} from 'winston';

export const logger = winston.createLogger({
  format: format.combine(
    format.splat(),
    format.simple()
  ),
    transports: [
      new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
      new winston.transports.File({ filename: 'logs/info.log', level: 'http' }),
    ],
  });
