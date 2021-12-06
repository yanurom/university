export {};

const examRepo = require('../exam/exam.memory.repository');

export interface Teacher {
  "id": string;
  "lastName": string;
  "firstName": string;
  "degree": string;
}

const teacherMock: Teacher[] = [
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

const cascadeDeleteMock = async (id: string) => {
  const allExams = await examRepo.getAll();
  allExams.forEach((_exam: ) => {
    const exam = _exam;
    if (exam.teacherId === id) {
      exam.teacherId = null;
    }
  });
  await examRepo.examCascadeMock();
};

const getAll = async () => teacherMock;

const createTeacher = async (teacher: Teacher) => teacherMock.push(teacher); 

const updateTeacher = async (teacher: Teacher) => {
  const index = teacherMock.findIndex(_ => _.id === teacher.id);

  teacherMock[index]!.firstName = teacher.firstName || teacherMock[index]!.firstName;
  teacherMock[index]!.lastName = teacher.lastName || teacherMock[index]!.lastName;
  teacherMock[index]!.degree = teacher.degree || teacherMock[index]!.degree;

  return teacherMock[index];
}; 

const deleteTeacher = async (id: string) => {
  const index = teacherMock.findIndex((teacher) => teacher.id === id);

  if (index >= 0) {
    const teachers = teacherMock.splice(index, 1);

    cascadeDeleteMock(id);

    return teachers[0];
  } 
    return { message: `No teacher with id: ${  id}` }
  
};

module.exports = { getAll, createTeacher, updateTeacher, deleteTeacher };
