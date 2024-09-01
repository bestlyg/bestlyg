import Router from '@koa/router';
import apiRouter from './api';
import staticRouter from './static';
import webRouter from './web';

export const router = new Router()
    .use('/api', apiRouter.routes(), apiRouter.allowedMethods())
    .use('/static', staticRouter.routes(), staticRouter.allowedMethods())
    .use('/web', webRouter.routes(), webRouter.allowedMethods());
