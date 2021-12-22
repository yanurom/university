import { ExamRepository } from "./exam.memory.repository";
import { getCustomRepository } from 'typeorm';
import Exam from "./exam.entity";

const examRepo = getCustomRepository(ExamRepository);

const getAll = () => examRepo.getAll();
const getById = async (id: string) => (await examRepo.getAll()).find((_: Exam) => _.id === id);
const getExamsByAbiturientId = async (id: string) => (await examRepo.getAll()).filter((_: Exam) => _.abiturientId === id);
const getExamsByTeacherId = async (id: string) => (await examRepo.getAll()).filter((_: Exam) => _.teacherId === id);
const createExam = async (abiturientId: string, teacherId: string, subject: string, date: string, score: number) => {
    // const all = await examRepo.getAll();
    // const id = `${+all[all.length-1]!.id + 1}`;
    const exam: Omit<Exam, 'id'> = {
        // id,
        abiturientId,
        teacherId,
        subject,
        date,
        score
    };

    if (await examRepo.createExam(exam)) {
        return exam;
    } 

    throw new Error('Constraints check fail.')
};

const updateExam = (exam: Exam) => examRepo.updateExam(exam.id, exam);
const deleteExam = (id: string) => examRepo.deleteExam(id);

export default { getAll, getById, getExamsByAbiturientId, getExamsByTeacherId, updateExam, deleteExam, createExam };
