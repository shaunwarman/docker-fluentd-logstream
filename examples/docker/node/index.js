const Express = require('express');
const Logger = require('docker-fluentd-logstream');

const app = Express();

const logger = new Logger({
  logOptions: {
    type: 'applogs'
  }
});

app.get('/log', (req, res) => {
  logger.log({ event: 'LOG', message: `${Date.now()} log event`});
  res.send('logged');
});

app.get('/error', (req, res) => {
  throw new Error('random error');
});

app.listen(8888, () => {
  logger.log({ event: 'START', message: 'application started'});
});

process.on('uncaughtException', (err) => {
  logger.log({ event: 'ERROR', message: err });
  process.exit(1);
})