export {};

import {Request, Response } from "express";

const router = require('express').Router();
const Abiturient = require('./abiturient.model');
const abiturientService = require('./abiturient.service');
const examService = require('../exam/exam.service');
const Exam = require('../exam/exam.model');


router.route('/').get(async (req: Request, res: Response) => {
  const abiturients = await abiturientService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(abiturients.map(Abiturient.toResponse));
});

router.route('/:abiturientId').get(async (req: Request, res: Response) => {
    const { abiturientId } = req.params;
    const abiturient = await abiturientService.getById(abiturientId);

    if (!abiturient) {
        res.json({});
        return;
    }

    res.json(Abiturient.toResponse(abiturient));
});

router.route('/:abiturientId/exams').get(async (req: Request, res: Response) => {
    const { abiturientId } = req.params;
    const exams = await examService.getExamsByAbiturientId(abiturientId);
    res.json(exams.map(Exam.toResponse));
});

router.route('/').post(async (req: Request, res: Response) => {
    const { lastName, firstName, numCertificate } = req.body;

    const abiturient = await abiturientService.createAbiturient(lastName, firstName, numCertificate);

    res.send(`Success! New abiturient: ${JSON.stringify(abiturient)}`);
});

router.route('/:abiturientId').put(async (req: Request, res: Response) => {
    const { abiturientId } = req.params;
    const { lastName, firstName, numCertificate } = req.body;
    const old = {...await abiturientService.getById(abiturientId)};

    const updated = await abiturientService.updateAbiturient({
        id: abiturientId,
        lastName,
        firstName,
        numCertificate,
    })

    res.send(`Updated: old: ${JSON.stringify(Abiturient.toResponse(old))} updated: ${JSON.stringify(Abiturient.toResponse(updated))}`);
});

router.route('/:abiturientId').delete(async (req: Request, res: Response) => {
    const { abiturientId } = req.params;

    const deleted = await abiturientService.deleteAbiturient(abiturientId);

    res.send(`Deleted: ${JSON.stringify(Abiturient.toResponse(deleted))}`);
});

module.exports = router;
