export {};

export interface Exam {
  "id": string;
  "abiturientId": string;
  "teacherId": string;
  "subject": string;
  "date": string;
  "score": number;
}

const examsMock: Exam[] = [
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

const deleteExam = async (id: string) => {
  const index = examsMock.findIndex(_ => _.id === id);

  if (index >= 0) {
    const exams = examsMock.splice(index, 1);
    return exams[0];
  } 

  return { message: `No exam with id: ${  id}` }
};

const cascadeDeleteMock = async () => {
  const pendingDelete = [];

  examsMock.forEach(exam => {
    if (exam.teacherId === null && exam.abiturientId === null) {
      pendingDelete.push(exam.id);
    }
  });

  const allPromises = [];
  pendingDelete.forEach(id => allPromises.push(deleteExam(id)))
  await Promise.all(allPromises);
};

const getAll = async () => examsMock;

const createExam = async (exam: Exam) => (await constraintsCheck(exam.teacherId, exam.abiturientId))
  ? examsMock.push(exam)
  : 0;

const updateExam = async (updatedExam: Exam) => {
  const index = examsMock.findIndex((exam: Exam) => exam.id === updatedExam.id);

  examsMock[index]!.abiturientId = updatedExam.abiturientId || examsMock[index]!.abiturientId;
  examsMock[index]!.teacherId = updatedExam.teacherId || examsMock[index]!.teacherId;
  examsMock[index]!.subject = updatedExam.subject || examsMock[index]!.subject;
  examsMock[index]!.date = updatedExam.date || examsMock[index]!.date;
  examsMock[index]!.score = updatedExam.score || examsMock[index]!.score;

  return examsMock[index];
}; 

module.exports = { getAll, updateExam, deleteExam, examCascadeMock: cascadeDeleteMock, createExam, initRepo };
