import { getCustomRepository } from 'typeorm';
import { TeacherRepository } from './teacher.memory.repository';
import Teacher from './teacher.entity';

const teacherRepo = getCustomRepository(TeacherRepository);

const getAll = () => teacherRepo.getAll();
const getById = async (id: string) => (await teacherRepo.getAll()).find((_: Teacher) => _.id === id);
const createTeacher = async (lastName: string, firstName: string, degree: string) => {
    // const all = await teacherRepo.getAll();
    // const id = `${+all[all.length-1]!.id + 1}`;
    const teacher = {
        // id,
        lastName,
        firstName,
        degree,
    };

    await teacherRepo.createTeacher(teacher);

    return teacher;
};
const updateTeacher = (teacher: Teacher) => teacherRepo.updateTeacher(teacher.id, teacher);
const deleteTeacher = (id: string) => teacherRepo.deleteTeacher(id);

export default { getAll, getById, createTeacher, updateTeacher, deleteTeacher };
