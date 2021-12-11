import application from './app';
import { unhandledRejection, uncaughtException } from './middlewares';


application.listen(4000, () =>
    console.log(`App is running on http://localhost:${4000}`) // eslint-disable-line no-console
);

process.on('uncaughtException', uncaughtException);
//throw Error('Oops!');
process.on('unhandledRejection', unhandledRejection);
//Promise.reject(Error('Oops!'));
