const { stringify } = require('./utils');

module.exports = {
  env: stringify({
    NODE_ENV: 'development',
  }),
  defineConstants: stringify({
    __SERVICE_URL__: 'http://192.168.1.111:8088/',
  }),
  mini: {},
  h5: {
    esnextModules: ['taro-ui'],
  },
};
