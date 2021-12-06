export {};

const uuid = require('uuid');

class Exam {
  "id": string;
  "abiturientId":  string | null;
  "teacherId": string | null;
  "subject": string;
  "date": string;
  "score": number;
  constructor({
      id = uuid(),
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

module.exports = Exam;
