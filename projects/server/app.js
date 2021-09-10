const chalk = require('chalk');
module.exports = app => {
  app.once('server', server => {});
  app.on('error', (err, ctx) => {
    app.logger.error(err);
  });
  app.on('request', ctx => {});
  app.on('response', ctx => {
    const { url, method } = ctx.request;
    const usedTime = Date.now() - ctx.starttime;
    const list = [`请求地址:${url}`, `请求方式:${method}`, `请求时间:${usedTime}ms`];
    app.logger.info(list.join(','));
  });
};
