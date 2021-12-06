export {};

import {Request, Response } from "express";

const router = require('express').Router();
const Teacher = require('./teacher.model');
const Exam = require('../exam/exam.model');
const teacherService = require('./teacher.service');
const examService = require('../exam/exam.service');

router.route('/').get(async (req: Request, res: Response) => {
  const teachers = await teacherService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(teachers.map(Teacher.toResponse));
});

router.route('/:teacherId').get(async (req: Request, res: Response) => {
    const { teacherId } = req.params;
    const teacher = await teacherService.getById(teacherId);

    if (!teacher) {
        res.json({});
        return;
    }

    res.json(Teacher.toResponse(teacher));
});

router.route('/:teacherId/exams').get(async (req: Request, res: Response) => {
    const { teacherId } = req.params;
    const exams = await examService.getExamsByTeacherId(teacherId);

    res.json(exams.map(Exam.toResponse));
});

router.route('/').post(async (req: Request, res: Response) => {
    const { lastName, firstName, degree } = req.body;

    const teacher = await teacherService.createTeacher(lastName, firstName, degree);

    res.send(`Success! New teacher: ${JSON.stringify(teacher)}`);
});

router.route('/:teacherId').put(async (req: Request, res: Response) => {
    const { teacherId } = req.params;
    const { lastName, firstName, degree } = req.body;
    const old = {...await teacherService.getById(teacherId)};

    const updated = await teacherService.updateTeacher({
        id: teacherId,
        lastName,
        firstName,
        degree,
    })

    res.send(`Updated: old: ${JSON.stringify(Teacher.toResponse(old))} updated: ${JSON.stringify(Teacher.toResponse(updated))}`);
});

router.route('/:teacherId').delete(async (req: Request, res: Response) => {
    const { teacherId } = req.params;

    const deleted = await teacherService.deleteTeacher(teacherId);

    res.send(`Deleted: ${JSON.stringify(Teacher.toResponse(deleted))}`);
});

module.exports = router;
