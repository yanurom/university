import { Application, Request, Response, NextFunction } from "express";

import express from 'express';
import log4js from 'log4js';
import abiturientRouter from './resources/abiturient/abiturient.router';
import examRouter from './resources/exam/exam.router';
import teacherRouter from './resources/teacher/teacher.router';
import { reposInitAction } from './actions/reposInitAction';

const app: Application = express();
const log = log4js.getLogger("startup");

log4js.configure({
  "appenders": {
    "app": {
      "type": "file",
      "filename": "log/app.log",
      "maxLogSize": 10485760,
      "numBackups": 3
    },
    "errorFile": {
      "type": "file",
      "filename": "log/errors.log"
    },
    "errors": {
      "type": "logLevelFilter",
      "level": "ERROR",
      "appender": "errorFile"
    }
  },
  "categories": {
    "default": { "appenders": [ "app", "errors" ], "level": "DEBUG" }
  }
});

app.use(express.json());

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

reposInitAction();

app.use('/abiturients', abiturientRouter);
app.use('/exams', examRouter);
app.use('/teachers', teacherRouter);

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (res.statusCode >= 400) {
    log.error(res);
  } else {
    log.info("[" + req.method +  "] " +  "Status code: " + res.statusCode + ", Path: " +
    req.protocol + '://' + req.get('host') + req.url + " " 
    + JSON.stringify(req.body)  + " Query params: " + JSON.stringify(req.query));
  }

  next();
});

export default app;
// module.exports = app;
