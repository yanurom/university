const express = require('express');
const userRouter = require('./resources/users/user.router');
const abiturientRouter = require('./resources/abiturient/abiturient.router');
const examRouter = require('./resources/exam/exam.router');
const teacherRouter = require('./resources/teacher/teacher.router');
const reposInitAction = require('./actions/reposInitAction');

const app = express();

app.use(express.json());

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

reposInitAction();

app.use('/users', userRouter);
app.use('/abiturients', abiturientRouter);
app.use('/exams', examRouter);
app.use('/teachers', teacherRouter);

module.exports = app;
