const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');

const resolve = (...p) => path.resolve(__dirname, '../', ...p);
module.exports = { fs, resolve, _ };
