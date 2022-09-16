const isPromise = require('is-promise');

/**
 * @param {Promise<unknown>} response
 * @returns {Promise<unknown>}
 */
function result(response) {
  const res = isPromise(response) ? response : Promise.resolve(response);
  return res.then(
    res => ({ code: 0, data: res }),
    err => ({
      code: 1,
      msg: err + '',
    })
  );
}

module.exports = {
  result,
};
