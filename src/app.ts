import { Application, Request, Response, NextFunction } from "express";

import express from 'express';
import abiturientRouter from './resources/abiturient/abiturient.router';
import examRouter from './resources/exam/exam.router';
import teacherRouter from './resources/teacher/teacher.router';
import { reposInitAction } from './actions/reposInitAction';

import { logging, errorHandling } from './middlewares';


const app: Application = express();

app.use(express.json());

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

reposInitAction();

app.use(logging);
app.use('/abiturients', abiturientRouter);
app.use('/exams', examRouter);
app.use('/teachers', teacherRouter);
app.use(errorHandling);

export default app;
// module.exports = app;
