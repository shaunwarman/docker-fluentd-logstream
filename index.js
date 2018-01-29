const {Writable} = require('stream');

class Logger extends Writable {
  constructor(options = {}) {
    const {tags = [], type = 'default'} = options;
    
    super({objectMode: true});
    
    this.tags = tags;
    this.type = type;
  }
  
  log(log) {
    if (!log) return;
    
    const {type, tags} = this;
    const {event = 'EMPTY', message = 'EMPTY'} = log;
    
    const noop = () => {}
    
    this.write({event, tags, type, message}, 'utf8', noop);
  }
  
  write(chunk, enc, callback) {
    // just write to stdout - docker will pick 
    // this up and ship to our logging driver
    console.log(chunk);
    callback();
  }
}

module.exports = Logger;