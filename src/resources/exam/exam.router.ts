export {};

import {Request, Response } from "express";

const router = require('express').Router();
const Exam = require('./exam.model');
const Teacher = require('../teacher/teacher.model');
const examService = require('./exam.service');
const teacherService = require('../teacher/teacher.service');

router.route('/').get(async (req: Request, res: Response) => {
  const exams = await examService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(exams.map(Exam.toResponse));
});

router.route('/:examId').get(async (req: Request, res: Response) => {
    const { examId } = req.params;
    const exam = await examService.getById(examId);

    if (!exam) {
        res.json({});
        return;
    }

    res.json(Exam.toResponse(exam));
});

router.route('/:examId/teachers').get(async (req: Request, res: Response) => {
    const { examId } = req.params;
    const exam = await examService.getById(examId);
    const teacher = await teacherService.getById(exam.teacherId);

    if (!teacher) {
        res.json({});
        return;
    }

    res.json(Teacher.toResponse(teacher));
});

router.route('/').post(async (req: Request, res: Response) => {
    const { abiturientId, teacherId, subject, date, score } = req.body;

    try {
        const exam = await examService.createExam(abiturientId, teacherId, subject, date, score);
        res.send(`Success! New exam: ${JSON.stringify(exam)}`);
    } catch (error) {
        // @ts-ignore
        res.send(`Fail! Error message: ${error.message}`);
    }

});

router.route('/:examId').put(async (req: Request, res: Response) => {
    const { examId } = req.params;
    const { abiturientId, teacherId, subject, date, score } = req.body;
    const old = {...await examService.getById(examId)};

    const updated = await examService.updateExam({
        id: examId,
        abiturientId,
        teacherId,
        subject,
        date,
        score,
    })

    res.send(`Updated: old: ${JSON.stringify(Exam.toResponse(old))} updated: ${JSON.stringify(Exam.toResponse(updated))}`);
});

router.route('/:examId').delete(async (req: Request, res: Response) => {
    const { examId } = req.params;

    const deleted = await examService.deleteExam(examId);

    res.send(`Deleted: ${JSON.stringify(Exam.toResponse(deleted))}`);
});

module.exports = router;
