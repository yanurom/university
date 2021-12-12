import examRepo, { Exam } from "../exam/exam.memory.repository";
import Abiturient from "./abiturient.model";

// export interface Abiturient {
//   "id": string;
//   "lastName": string;
//   "firstName": string;
//   "numCertificate": number;
// }

const abiturientMock: Abiturient[] = [
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

const cascadeDeleteabiturientMock = async (id: string) => {
  const allExams = await examRepo.getAll();

  allExams.forEach((_exam: Exam) => {
    const exam = _exam;
    if (exam.abiturientId === id) {
      exam.abiturientId = null;
    }
  });
  await examRepo.examCascadeMock();
};


// TODO: abiturientMock implementation. should be replaced during task development
const getAllAbiturients = async () => abiturientMock;
const createAbiturient = async (abiturient: Abiturient) => abiturientMock.push(abiturient); 
const updateAbiturient = async (abiturient: Abiturient) => {
  const index = abiturientMock.findIndex(_ => _.id === abiturient.id);

  abiturientMock[index]!.firstName = abiturient.firstName || abiturientMock[index]!.firstName;
  abiturientMock[index]!.lastName = abiturient.lastName || abiturientMock[index]!.lastName;
  abiturientMock[index]!.numCertificate = abiturient.numCertificate || abiturientMock[index]!.numCertificate;

  return abiturientMock[index];
}; 
const deleteAbiturient = async (id: string) => {
  const index = abiturientMock.findIndex(_ => _.id === id);

  if (index >= 0) {
    const abiturients = abiturientMock.splice(index, 1);

    cascadeDeleteabiturientMock(id);

    return abiturients[0];
  } 

  return { message: `No user with id: ${  id}` }
};

export type AbiturientRepo = {
  getAllAbiturients: () => Promise<Abiturient[]>,
  createAbiturient: (abiturient: Abiturient) => Promise<number>,
  updateAbiturient: (abiturient: Abiturient) => Promise<Abiturient | undefined>,
  deleteAbiturient: (id: string) => Promise<Abiturient | {
    message: string;
  } | undefined>
}

export default { getAllAbiturients, createAbiturient, updateAbiturient, deleteAbiturient };
// module.exports = { getAllAbiturients, createAbiturient, updateAbiturient, deleteAbiturient };
