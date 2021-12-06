export {};
import { Abiturient } from "./abiturient.memory.repository";
const abiturientRepo = require('./abiturient.memory.repository');

const getAll = () => abiturientRepo.getAll();
const getById = async (id: string) => (await abiturientRepo.getAll()).find((abiturient: Abiturient) => abiturient.id === id);
const createAbiturient = async (lastName: string, firstName: string, numCertificate: number) => {
    const all = await abiturientRepo.getAll();
    const id = `${+all[all.length-1].id + 1}`;
    const abiturient: Abiturient = {
        id,
        lastName,
        firstName,
        numCertificate,
    };

    await abiturientRepo.createAbiturient(abiturient);

    return abiturient;
};
const updateAbiturient = (abiturient: Abiturient) => abiturientRepo.updateAbiturient(abiturient);
const deleteAbiturient = (id: string) => abiturientRepo.deleteAbiturient(id);

module.exports = { getAll, getById, createAbiturient, updateAbiturient, deleteAbiturient };
