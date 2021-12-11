import abiturientRepo from "./abiturient.memory.repository";
import Abiturient from "./abiturient.model";

const getAll = () => abiturientRepo.getAllAbiturients();
const getById = async (id: string) => (await abiturientRepo.getAllAbiturients()).find((abiturient: Abiturient) => abiturient.id === id);
const createAbiturient = async (lastName: string, firstName: string, numCertificate: number) => {
    const all = await abiturientRepo.getAllAbiturients();
    const id = `${+all[all.length-1]!.id + 1}`;
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

export default { getAll, getById, createAbiturient, updateAbiturient, deleteAbiturient };
// module.exports = { getAll, getById, createAbiturient, updateAbiturient, deleteAbiturient };
