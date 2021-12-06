export {};

const teacherRepo = require('./teacher.memory.repository');

const getAll = () => teacherRepo.getAll();
const getById = async (id) => (await teacherRepo.getAll()).find(_ => _.id === id);
const createTeacher = async (lastName, firstName, degree) => {
    const all = await teacherRepo.getAll();
    const id = `${+all[all.length-1].id + 1}`;
    const teacher = {
        id,
        lastName,
        firstName,
        degree,
    };

    await teacherRepo.createTeacher(teacher);

    return teacher;
};
const updateTeacher = (teacher) => teacherRepo.updateTeacher(teacher);
const deleteTeacher = (id) => teacherRepo.deleteTeacher(id);

module.exports = { getAll, getById, createTeacher, updateTeacher, deleteTeacher };
