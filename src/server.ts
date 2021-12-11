import config  from './common/config';
import application from './app';

application.listen(config.PORT, () =>
  console.log(`App is running on http://localhost:${config.PORT}`) // eslint-disable-line no-console
);
