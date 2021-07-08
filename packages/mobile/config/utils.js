const path = require('path');
/**
 * @param {string[]} p
 */
const resolve = (...p) => path.resolve(__dirname, '../', ...p);
const __ENV_DEV__ = process.env.NODE_ENV === 'development';
const __ENV_PROD__ = process.env.NODE_ENV === 'production';
const __TAG_ENV__ = __ENV_DEV__ ? 'dev' : 'prod';
const __TAG_END__ = process.env.TARO_ENV;
const stringify = obj => {
  Object.entries(obj).forEach(([k, v]) => {
    obj[k] = JSON.stringify(v);
  });
  return obj;
};
const pkg = require(resolve('package.json'));
module.exports = {
  resolve,
  stringify,
  __ENV_DEV__,
  __ENV_PROD__,
  __TAG_ENV__,
  __TAG_END__,
  pkg,
};
