const { Transform } = require("stream");

const { sortArray } = require("./code");

class SortArrayTransform extends Transform {
  constructor() {
    super();
  }

  _transform(chunk, _, done) {
    let result = "";

    result = sortArray(chunk.toString("utf8"));

    this.push(result);
    done();
  }
}

module.exports = SortArrayTransform;
