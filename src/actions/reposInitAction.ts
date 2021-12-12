import examRepo from "../resources/exam/exam.memory.repository";
import teacherRepo from '../resources/teacher/teacher.memory.repository';
import abiturientRepo from '../resources/abiturient/abiturient.memory.repository';

const reposInitAction = async () : Promise<void> => {
    await examRepo.initRepo({ abiturientRepo, teacherRepo });
};

export { reposInitAction };
