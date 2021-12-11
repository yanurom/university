import express, { NextFunction, Request, Response } from "express";
import Teacher from './teacher.model';
import Exam from '../exam/exam.model';
import teacherService from './teacher.service';
import examService from '../exam/exam.service';

const router = express.Router();

router.route('/').get(async (req: Request, res: Response, next: NextFunction) => {
  const teachers = await teacherService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(teachers.map(Teacher.toResponse));
  next();
});

router.route('/:teacherId').get(async (req: Request, res: Response, next: NextFunction) => {
    const { teacherId } = req.params;
    const teacher = await teacherService.getById(teacherId!);

    if (!teacher) {
        res.json({});
        return;
    }

    res.json(Teacher.toResponse(teacher));
    next();
});

router.route('/:teacherId/exams').get(async (req: Request, res: Response, next: NextFunction) => {
    const { teacherId } = req.params;
    const exams = await examService.getExamsByTeacherId(teacherId!);

    res.json(exams.map(Exam.toResponse));
    next();
});

router.route('/').post(async (req: Request, res: Response, next: NextFunction) => {
    const { lastName, firstName, degree } = req.body;

    const teacher = await teacherService.createTeacher(lastName, firstName, degree);

    res.send(`Success! New teacher: ${JSON.stringify(teacher)}`);
    next();
});

router.route('/:teacherId').put(async (req: Request, res: Response, next: NextFunction) => {
    const { teacherId } = req.params;
    const { lastName, firstName, degree } = req.body;
    const old: Teacher = {...await teacherService.getById(teacherId!)} as Teacher;

    const updated = await teacherService.updateTeacher({
        id: teacherId!,
        lastName,
        firstName,
        degree,
    })

    res.send(`Updated: old: ${JSON.stringify(Teacher.toResponse(old))} updated: ${JSON.stringify(Teacher.toResponse(updated!))}`);
    next();
});

router.route('/:teacherId').delete(async (req: Request, res: Response, next: NextFunction) => {
    const { teacherId } = req.params;

    const deleted = await teacherService.deleteTeacher(teacherId!);

    res.send(`Deleted: ${JSON.stringify(Teacher.toResponse(deleted as Teacher))}`);
    next();
});

// module.exports = router;
export default router;
