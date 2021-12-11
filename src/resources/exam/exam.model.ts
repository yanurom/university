
class Exam {
  id: string;

  abiturientId:  string | null;

  teacherId: string | null;

  subject: string;

  date: string;

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
