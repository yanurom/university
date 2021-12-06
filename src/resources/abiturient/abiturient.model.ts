export {};

const uuid = require('uuid');

class Abiturient {
  "id": string;
  "lastName": string;
  "firstName": string;
  "numCertificate": number;
  constructor({
      id = uuid(),
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

module.exports = Abiturient;
