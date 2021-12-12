
class Teacher {
  id: string;

  lastName: string;

  firstName: string;

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
