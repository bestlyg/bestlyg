const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');
const chalk = require('chalk');
const args = require('minimist')(process.argv.slice(2));

const resolve = (...p) => path.resolve(__dirname, '../', ...p);
module.exports = { fs, resolve, _, args, chalk };
