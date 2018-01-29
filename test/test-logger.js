const Test = require('tape');

const Logger = require('..');

Test('logger', t => {
  const logger = new Logger();
  
  t.test('init', t => {
    t.equals(typeof logger, 'object');
    t.equals(logger instanceof Logger, true);
    t.end();
  });
  
  t.test('defaults', t => {
    const {tags, type} = logger;
    
    t.equals(Array.isArray(tags), true);
    t.equals(type, 'default');
    t.end();
  });
  
  t.test('custom options', t => {
    const custom = new Logger({ type: 'elastic', tags: ['app', 'nginx'] });
    t.equals(custom.type, 'elastic');
    t.equals(custom.tags.includes('app'), true);
    t.end();
  });
  
});