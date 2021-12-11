import config  from './common/config';
import application from './app';
import { unhandledRejection, uncaughtException } from './middlewares';


application.listen(config.PORT, () =>
    console.log(`App is running on http://localhost:${config.PORT}`) // eslint-disable-line no-console
);

process.on('uncaughtException', uncaughtException);
//throw Error('Oops!');
process.on('unhandledRejection', unhandledRejection);
//Promise.reject(Error('Oops!'));
