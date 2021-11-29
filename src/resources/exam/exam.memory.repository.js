
const mock = [
  {
    id: '1',
    abiturientId: '124',
    teacherId: '111',
    subject: 'Math',
    date: '16 June 2001',
    score: 8,
  },
  {
    id: '2',
    abiturientId: '124',
    teacherId: '112',
    subject: 'Physics',
    date: '18 June 2001',
    score: 7,
  },
  {
    id: '3',
    abiturientId: '124',
    teacherId: '112',
    subject: 'Biology',
    date: '20 June 2001',
    score: 10,
  },

  {
    id: '4',
    abiturientId: '125',
    teacherId: '111',
    subject: 'Math',
    date: '16 June 2001',
    score: 6,
  },
  {
    id: '5',
    abiturientId: '125',
    teacherId: '112',
    subject: 'Physics',
    date: '18 June 2001',
    score: 2,
  },
  {
    id: '6',
    abiturientId: '125',
    teacherId: '112',
    subject: 'Biology',
    date: '20 June 2001',
    score: 3,
  },

  {
    id: '7',
    abiturientId: '126',
    teacherId: '111',
    subject: 'Math',
    date: '16 June 2001',
    score: 10,
  },
  {
    id: '8',
    abiturientId: '126',
    teacherId: '112',
    subject: 'Physics',
    date: '18 June 2001',
    score: 9,
  },
  {
    id: '9',
    abiturientId: '126',
    teacherId: '112',
    subject: 'Biology',
    date: '20 June 2001',
    score: 1,
  },
];
const repos = {
  abiturientRepo: null,
  teacherRepo: null,
};
const initRepo = async ({ abiturientRepo, teacherRepo }) => {
  repos.abiturientRepo = abiturientRepo;
  repos.teacherRepo = teacherRepo;
}

const constraintsCheck = async (teacherId, abiturientId) => ((await repos.teacherRepo.getAll()).filter(_ => _.id === teacherId).length > 0
  && (await repos.abiturientRepo.getAll()).filter(_ => _.id === abiturientId).length > 0)

const deleteExam = async (id) => {
  const index = mock.findIndex(_ => _.id === id);

  if (index >= 0) {
    const exams = mock.splice(index, 1);
    return exams[0];
  } 

  return { message: `No exam with id: ${  id}` }
};

const cascadeDeleteMock = async () => {
  const pendingDelete = [];

  mock.forEach(exam => {
    if (exam.teacherId === null && exam.abiturientId === null) {
      pendingDelete.push(exam.id);
    }
  });

  const allPromises = [];
  pendingDelete.forEach(id => allPromises.push(deleteExam(id)))
  await Promise.all(allPromises);
};

const getAll = async () => mock;

const createExam = async (exam) => (await constraintsCheck(exam.teacherId, exam.abiturientId))
  ? mock.push(exam)
  : 0;

const updateExam = async (exam) => {
  const index = mock.findIndex(_ => _.id === exam.id);

  mock[index].abiturientId = exam.abiturientId || mock[index].abiturientId;
  mock[index].teacherId = exam.teacherId || mock[index].teacherId;
  mock[index].subject = exam.subject || mock[index].subject;
  mock[index].date = exam.date || mock[index].date;
  mock[index].score = exam.score || mock[index].score;

  return mock[index];
}; 

module.exports = { getAll, updateExam, deleteExam, examCascadeMock: cascadeDeleteMock, createExam, initRepo };
