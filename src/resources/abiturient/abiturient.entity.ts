import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'abiturients' })
export default class Abiturient {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  lastName: string;
  @Column()
  firstName: string;
  @Column()
  numCertificate: number;

  constructor({
      id = `${Math.random() * 10000}`,
      lastName = 'lastName',
      firstName = 'firstName',
      numCertificate = 0x0001,
    } = {}) {
    this.id = id;
    this.lastName = lastName;
    this.firstName = firstName;
    this.numCertificate = numCertificate;
  }

  static toResponse(abiturient: Abiturient) {
    // const { id, lastName, firstName, numCertificate } = abiturient;
    // return { id, lastName, firstName, numCertificate };
    return { ...abiturient }
  }
}
