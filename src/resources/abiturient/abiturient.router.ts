import express, { NextFunction, Request, Response } from 'express';
import Abiturient from './abiturient.entity';
import abiturientService from './abiturient.service';
import examService from '../exam/exam.service';
import Exam from '../exam/exam.entity';

const router = express.Router();

router.route('/').get(async (req: Request, res: Response, next: NextFunction) => {
  const abiturients = await abiturientService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(abiturients.map(Abiturient.toResponse));
  next();
});

router.route('/:abiturientId').get(async (req: Request, res: Response, next: NextFunction) => {
    const { abiturientId } = req.params;
    const abiturient = await abiturientService.getById(abiturientId!);

    if (!abiturient) {
        res.json({});
        return;
    }

    res.json(Abiturient.toResponse(abiturient));
    next();
});

router.route('/:abiturientId/exams').get(async (req: Request, res: Response, next: NextFunction) => {
    const { abiturientId } = req.params;
    const exams = await examService.getExamsByAbiturientId(abiturientId!);
    res.json(exams.map(Exam.toResponse));
    next();
});

router.route('/').post(async (req: Request, res: Response, next: NextFunction) => {
    const { lastName, firstName, numCertificate } = req.body;

    const abiturient = await abiturientService.createAbiturient(lastName, firstName, numCertificate);

    res.send(`Success! New abiturient: ${JSON.stringify(abiturient)}`);
    next();
});

router.route('/:abiturientId').put(async (req: Request, res: Response, next: NextFunction) => {
    const { abiturientId } = req.params;
    const { lastName, firstName, numCertificate } = req.body;
    const old: Abiturient = {...await abiturientService.getById(abiturientId!)} as Abiturient;

    const updated = await abiturientService.updateAbiturient({
        id: abiturientId!,
        lastName,
        firstName,
        numCertificate,
    })

    res.send(`Updated: old: ${JSON.stringify(Abiturient.toResponse(old))} updated: ${JSON.stringify(updated!)}`);
    next();
});

router.route('/:abiturientId').delete(async (req: Request, res: Response, next: NextFunction) => {
    const { abiturientId } = req.params;

    const deleted = await abiturientService.deleteAbiturient(abiturientId!);

    res.send(`Deleted: ${JSON.stringify(deleted)}`);
    next();
});

export default router;
