import { EntityRepository, AbstractRepository } from 'typeorm';
import Exam from "./exam.entity";

@EntityRepository(Exam)
export class ExamRepository extends AbstractRepository<Exam> {
  createExam(task: Omit<Exam, 'id'>) {
    const tasks = this.repository.create(task);
    return this.manager.save(tasks);
  }

  getAll() {
    return this.repository.find();
  }

  getById(id: string) {
    return this.repository.findOne({ id });
  }

  updateExam(id: string, data: Partial<Exam>) {
    return this.repository.update({ id }, data);
  }

  deleteExam(id: string) {
    return this.repository.delete({ id });
  }
}
