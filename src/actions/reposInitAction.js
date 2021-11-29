
const examRepo = require('../resources/exam/exam.memory.repository')
const teacherRepo = require('../resources/teacher/teacher.memory.repository')
const abiturientRepo = require('../resources/abiturient/abiturient.memory.repository')

const reposInitAction = async () => {
    await examRepo.initRepo({ abiturientRepo, teacherRepo });
};

module.exports = reposInitAction;
