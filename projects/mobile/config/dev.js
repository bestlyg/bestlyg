const { stringify } = require('./utils');

module.exports = {
  env: stringify({
    NODE_ENV: 'development',
  }),
  defineConstants: stringify({
    __SERVICE_URL__: 'http://192.168.1.111:8088/',
  }),
  mini: {
    webpackChain(chain) {
      chain.plugin('analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [
        {
          analyzerPort: 20000,
          openAnalyzer: false,
        },
      ]);
    },
  },
  h5: {
    esnextModules: ['taro-ui'],
  },
};
