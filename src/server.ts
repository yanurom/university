import config  from './common/config';
import application from './app';
import log4js from 'log4js';

const log = log4js.getLogger("startup");

application.listen(config.PORT, () =>
    log.info(`App is running on http://localhost:${config.PORT}`) // eslint-disable-line no-console
);
