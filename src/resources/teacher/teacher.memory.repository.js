const examRepo = require('../exam/exam.memory.repository');

const mock = [
  {
    id: '112',
    lastName: 'teacherLastName1',
    firstName: 'teacherFirstName1',
    degree: 'Low',
  },
  {
    id: '111',
    lastName: 'teacherLastName2',
    firstName: 'teacherFirstName2',
    degree: 'High',
  },
  {
    id: '113',
    lastName: 'teacherLastName3',
    firstName: 'teacherFirstName3',
    degree: 'Low',
  },
  {
    id: '114',
    lastName: 'teacherLastName5',
    firstName: 'teacherFirstName5',
    degree: 'High',
  },
  {
    id: '115',
    lastName: 'teacherLastName4',
    firstName: 'teacherFirstName4',
    degree: 'Low',
  },
  {
    id: '116',
    lastName: 'teacherLastName6',
    firstName: 'teacherFirstName6',
    degree: 'High',
  },
];

const cascadeDeleteMock = async (id) => {
  const allExams = await examRepo.getAll();
  allExams.forEach(_exam => {
    const exam = _exam;
    if (exam.teacherId === id) {
      exam.teacherId = null;
    }
  });
  await examRepo.examCascadeMock();
};

const getAll = async () => mock;

const createTeacher = async (teacher) => mock.push(teacher); 

const updateTeacher = async (teacher) => {
  const index = mock.findIndex(_ => _.id === teacher.id);

  mock[index].firstName = teacher.firstName || mock[index].firstName;
  mock[index].lastName = teacher.lastName || mock[index].lastName;
  mock[index].degree = teacher.degree || mock[index].degree;

  return mock[index];
}; 

const deleteTeacher = async (id) => {
  const index = mock.findIndex(_ => _.id === id);

  if (index >= 0) {
    const teachers = mock.splice(index, 1);

    cascadeDeleteMock(id);

    return teachers[0];
  } 
    return { message: `No teacher with id: ${  id}` }
  
};

module.exports = { getAll, createTeacher, updateTeacher, deleteTeacher };
