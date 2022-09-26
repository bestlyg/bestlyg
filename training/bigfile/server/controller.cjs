const path = require('path');
const fs = require('fs-extra');
const { rootpath } = require('./utils.cjs');

class Controller {
  constructor(uploadDir = path.resolve(rootpath, './temp')) {
    this.uploadDir = uploadDir;
    fs.ensureDir(uploadDir);
  }
  request(req, res) {
    if (req.url === '/') {
      this.index(req, res);
    } else {
      this.index(req, res);
    }
  }
  index(req, res) {
    res.status = 200;
    res.end(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>Document</title>
      </head>
      <body>
          <h1>Hello World</h1>
      </body>
      </html>
    `);
  }
}

module.exports = {
  Controller,
};
