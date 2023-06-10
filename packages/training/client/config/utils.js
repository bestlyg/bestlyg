const path = require('path');

/**
 * @param  {...string} p
 * @returns {string}
 */
const resolve = (...p) => path.resolve(__dirname, '../../', ...p);

const IS_PROD = process.env.NODE_ENV === 'production';
const IS_DEV = !IS_PROD;

module.exports = { resolve, IS_PROD, IS_DEV };
