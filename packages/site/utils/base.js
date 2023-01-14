const path = require('path');

/**
 * @param  {...string} p
 * @returns {string}
 */
const resolve = (...p) => path.resolve(__dirname, '../', ...p);

module.exports = {
  resolve,
};
