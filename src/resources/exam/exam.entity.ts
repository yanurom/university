
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'exams' })
class Exam {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 36, nullable: true })
  abiturientId:  string | null;

  @Column('varchar', { length: 36, nullable: true })
  teacherId: string | null;

  @Column()
  subject: string;

  @Column()
  date: string;

  @Column()
  score: number;

  constructor({
      id = `${Math.random()*1000}`,
      abiturientId = null,
      teacherId = null,
      subject = 'None',
      date = 'None',
      score = -1,
    } = {}) {
    this.id = id;
    this.abiturientId = abiturientId;
    this.teacherId = teacherId;
    this.subject = subject;
    this.date = date;
    this.score = score;
  }

  static toResponse(exam: Exam) {
    return { ...exam };
  }
}

export default Exam;
// module.exports = Exam;
