const examRepo = require('./exam.memory.repository');

const getAll = () => examRepo.getAll();
const getById = async (id) => (await examRepo.getAll()).find(_ => _.id === id);
const getExamsByAbiturientId = async (id) => (await examRepo.getAll()).filter(_ => _.abiturientId === id);
const getExamsByTeacherId = async (id) => (await examRepo.getAll()).filter(_ => _.teacherId === id);
const createExam = async (abiturientId, teacherId, subject, date, score) => {
    const all = await examRepo.getAll();
    const id = `${+all[all.length-1].id + 1}`;
    const exam = {
        id,
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

const updateExam = (abiturient) => examRepo.updateExam(abiturient);
const deleteExam = (id) => examRepo.deleteExam(id);

module.exports = { getAll, getById, getExamsByAbiturientId, getExamsByTeacherId, updateExam, deleteExam, createExam };
