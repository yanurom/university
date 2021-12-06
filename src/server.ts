import { Application } from "express";

const { PORT } = require('./common/config');
const application : unknown = require('./app');

application.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`) // eslint-disable-line no-console
);
