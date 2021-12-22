import { EntityRepository, AbstractRepository } from 'typeorm';
import Abiturient from "./abiturient.entity";

@EntityRepository(Abiturient)
export class AbiturientRepository extends AbstractRepository<Abiturient> {
  createAbiturient(abiturient: Omit<Abiturient, 'id'>) {
    const abiturients = this.repository.create(abiturient);
    return this.manager.save(abiturients);
  }

  getAllAbiturients() {
    return this.repository.find();
  }

  getById(id: string) {
    return this.repository.findOne({ id });
  }

  updateById(id: string, abiturient: Partial<Abiturient>) {
    return this.repository.update({ id }, abiturient);
  }

  deleteById(id: string) {
    return this.repository.delete({ id });
  }
}
