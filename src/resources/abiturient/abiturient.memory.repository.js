const examRepo = require('../exam/exam.memory.repository');

const mock = [
  {
    id: '123',
    lastName: 'lastName1',
    firstName: 'firstName1',
    numCertificate: 12345678,
  },
  {
    id: '124',
    lastName: 'lastName2',
    firstName: 'firstName2',
    numCertificate: 123123123,
  },
  {
    id: '125',
    lastName: 'lastName3',
    firstName: 'firstName3',
    numCertificate: 11111111,
  },
  {
    id: '126',
    lastName: 'lastName4',
    firstName: 'firstName4',
    numCertificate: 222222222,
  },
];

const cascadeDeleteMock = async (id) => {
  const allExams = await examRepo.getAll();

  allExams.forEach(_exam => {
    const exam = _exam;
    if (exam.abiturientId === id) {
      exam.abiturientId = null;
    }
  });
  await examRepo.examCascadeMock();
};


// TODO: mock implementation. should be replaced during task development
const getAll = async () => mock;
const createAbiturient = async (abiturient) => mock.push(abiturient); 
const updateAbiturient = async (abiturient) => {
  const index = mock.findIndex(_ => _.id === abiturient.id);

  mock[index].firstName = abiturient.firstName || mock[index].firstName;
  mock[index].lastName = abiturient.lastName || mock[index].lastName;
  mock[index].numCertificate = abiturient.numCertificate || mock[index].numCertificate;

  return mock[index];
}; 
const deleteAbiturient = async (id) => {
  const index = mock.findIndex(_ => _.id === id);

  if (index >= 0) {
    const abiturients = mock.splice(index, 1);

    cascadeDeleteMock(id);

    return abiturients[0];
  } 

  return { message: `No user with id: ${  id}` }
};

module.exports = { getAll, createAbiturient, updateAbiturient, deleteAbiturient };
