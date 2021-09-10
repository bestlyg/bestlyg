'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/public/uuid', controller.public.uuid);
  router.get('/public/qrcode', controller.public.qrcode);
};
