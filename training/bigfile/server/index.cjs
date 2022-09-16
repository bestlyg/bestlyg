const http = require('http');

const { result } = require('./utils.cjs');
const { Controller } = require('./controller.cjs');
const server = http.createServer();

const ctrl = new Controller();
server.on('request', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.status = 200;
    res.end();
  } else {
    ctrl.request(req, res);
    return;
  }
});
server.listen(3000, () => {
  console.log('server listening');
});
