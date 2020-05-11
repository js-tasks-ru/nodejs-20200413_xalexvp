const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.textBuffer = '';
  }

  _transform(chunk, encoding, callback) {
    const regExpEnd = new RegExp(os.EOL);
    const chunkToString = this.textBuffer + chunk.toString();

    if (!regExpEnd.test(chunkToString)) {
      this.textBuffer = chunkToString;
    } else {
      const isClearEnd = chunkToString.endsWith(os.EOL);
      if (isClearEnd) {
        this.textBuffer = '';
      }

      const textDataArr = chunkToString.split(os.EOL);
      textDataArr.map((stringItem, i) => {
        if ((i === (textDataArr.length - 1)) && !isClearEnd) {
          this.textBuffer = stringItem;
        } else {
          this.push(stringItem);
        }
      });
    }
    callback();
  }

  _flush(callback) {
    if (this.textBuffer) {
      this.push(this.textBuffer);
    }
    callback();
  }
}

module.exports = LineSplitStream;
