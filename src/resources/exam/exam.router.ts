import express, { NextFunction, Request, Response } from "express";
import Exam from './exam.model';
import Teacher from '../teacher/teacher.model';
import examService from './exam.service';
import teacherService from '../teacher/teacher.service';
// import log4js from 'log4js';

const router = express.Router();
// const log = log4js.getLogger("request");

router.route('/').get(async (req: Request, res: Response, next: NextFunction) => {
  const exams = await examService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(exams.map(Exam.toResponse));
  next();
});

router.route('/:examId').get(async (req: Request, res: Response, next: NextFunction) => {
    const { examId } = req.params;
    const exam = await examService.getById(examId!);

    if (!exam) {
        res.json({});
        return;
    }

    res.json(Exam.toResponse(exam));
    next();
});

router.route('/:examId/teachers').get(async (req: Request, res: Response, next: NextFunction) => {
    const { examId } = req.params;
    const exam = await examService.getById(examId!);
    const teacher = await teacherService.getById(exam!.teacherId!);

    if (!teacher) {
        res.json({});
        return;
    }

    res.json(Teacher.toResponse(teacher));
    next();
});

router.route('/').post(async (req: Request, res: Response, next: NextFunction) => {
    const { abiturientId, teacherId, subject, date, score } = req.body;

    try {
        const exam = await examService.createExam(abiturientId, teacherId, subject, date, score);
        res.send(`Success! New exam: ${JSON.stringify(exam)}`);
    } catch (error) {
        // @ts-ignore
        res.send(`Fail! Error message: ${error.message}`);
    }
    next();

});

router.route('/:examId').put(async (req: Request, res: Response, next: NextFunction) => {
    const { examId } = req.params;
    const { abiturientId, teacherId, subject, date, score } = req.body;
    const old: Exam = {...await examService.getById(examId!)} as Exam;

    const updated: Exam = await examService.updateExam({
        id: examId!,
        abiturientId,
        teacherId,
        subject,
        date,
        score,
    })

    res.send(`Updated: old: ${JSON.stringify(Exam.toResponse(old))} updated: ${JSON.stringify(Exam.toResponse(updated))}`);
    next();
});

router.route('/:examId').delete(async (req: Request, res: Response, next: NextFunction) => {
    const { examId } = req.params;

    const deleted = await examService.deleteExam(examId!);

    res.send(`Deleted: ${JSON.stringify(Exam.toResponse(deleted as Exam))}`);
    next();
});

// module.exports = router;
export default router;
