const abiturientRepo = require('./abiturient.memory.repository');

const getAll = () => abiturientRepo.getAll();
const getById = async (id) => (await abiturientRepo.getAll()).find(_ => _.id === id);
const createAbiturient = async (lastName, firstName, numCertificate) => {
    const all = await abiturientRepo.getAll();
    const id = `${+all[all.length-1].id + 1}`;
    const abiturient = {
        id,
        lastName,
        firstName,
        numCertificate,
    };

    await abiturientRepo.createAbiturient(abiturient);

    return abiturient;
};
const updateAbiturient = (abiturient) => abiturientRepo.updateAbiturient(abiturient);
const deleteAbiturient = (id) => abiturientRepo.deleteAbiturient(id);

module.exports = { getAll, getById, createAbiturient, updateAbiturient, deleteAbiturient };
