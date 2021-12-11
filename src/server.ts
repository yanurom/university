// import config  from './common/config';
import application from './app';

application.listen(4000, () =>
  console.log(`App is running on http://localhost:${4000}`) // eslint-disable-line no-console
);
