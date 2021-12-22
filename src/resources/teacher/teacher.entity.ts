import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'teachers' })
class Teacher {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  lastName: string;

  @Column()
  firstName: string;

  @Column()
  degree: string;

  constructor({
      id = `${Math.random() * 10000}`,
      lastName = 'lastName',
      firstName = 'firstName',
      degree = 'High'
    } = {}) {
    this.id = id;
    this.lastName = lastName;
    this.firstName = firstName;
    this.degree = degree;
  }

  static toResponse(teacher: Teacher) {
    return { ...teacher };
  }
}

export default Teacher;
