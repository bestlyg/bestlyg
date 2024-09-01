// import { resolve } from '@/utils/index';
import Router from '@koa/router';
import send from 'koa-send';
import { server } from '@bestlyg/config';

const router = new Router();
// const rootPath = resolve('..', '..', 'temp');
const rootPath = server.webPath;

router.get('/(.*)', async ctx => {
    await send(ctx, '/' + ctx.params['0'], {
        root: rootPath,
        index: 'index.html',
    });
});

export default router;
