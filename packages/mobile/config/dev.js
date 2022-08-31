const { portIsOccupied, chalk } = require('./utils');

module.exports = {
  env: {
    NODE_ENV: '"development"',
  },
  defineConstants: {},
  mini: {
    webpackChain(chain, webpack) {
      const port = 10000;
      chain.plugin('analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [
        {
          analyzerPort: port,
          openAnalyzer: false,
        },
      ]);
    },
  },
  h5: {
    esnextModules: ['taro-ui'],
  },
};
