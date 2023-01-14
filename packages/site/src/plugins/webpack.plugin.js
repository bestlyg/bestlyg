module.exports = function () {
  return {
    configureWebpack(config, isServer, utils, content) {
      console.log('webpack plugin');
      console.log({
        config,
        isServer,
        utils,
        content,
      });
      return {
        cache: { type: 'filesystem' },
        // proxy: {},
      };
    },
  };
};
