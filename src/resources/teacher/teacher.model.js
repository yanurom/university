const uuid = require('uuid');

class Teacher {
  constructor({
      id = uuid(),
      lastName = 'lastName',
      firstName = 'firstName',
      degree = 'High'
    } = {}) {
    this.id = id;
    this.lastName = lastName;
    this.firstName = firstName;
    this.degree = degree;
  }

  static toResponse(teacher) {
    return { ...teacher };
  }
}

module.exports = Teacher;
