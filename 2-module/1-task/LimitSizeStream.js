const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

let counter = 0;
class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.options = options;
  }

  _transform(chunk, encoding, callback) {
    counter += chunk.length;
    if (counter > this.options.limit) {
      callback( new LimitExceededError, chunk);
    } else {
      callback(null, chunk);
    }
  }
}

module.exports = LimitSizeStream;
