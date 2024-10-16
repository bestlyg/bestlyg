import Router from '@koa/router';
import apiRouter from './api';
import staticRouter from './static';
import webRouter from './web';
import idlRouter from './idl';

export const router = new Router()
    .use(idlRouter.routes(), idlRouter.allowedMethods())
    .use('/api', apiRouter.routes(), apiRouter.allowedMethods())
    .use('/static', staticRouter.routes(), staticRouter.allowedMethods())
    .use('/web', webRouter.routes(), webRouter.allowedMethods())
    .all('(.*)', async ctx => {
        ctx.redirect('/web/site');
    });
