const path = require('path');
const EMPTY_OBJ = Object.create(null);
const resolve = (...p) => path.resolve.apply(EMPTY_OBJ, [__dirname, ...p]);
const _ = require('lodash');
const __DEV__ = process.env.NODE_ENV === 'development';
const __PROD__ = process.env.NODE_ENV === 'production';
const pkg = require('./package.json');
const fs = require('fs-extra');
module.exports = { resolve, path, __DEV__, __PROD__, _, pkg, EMPTY_OBJ, fs };
