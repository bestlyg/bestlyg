import { resolve } from '@/utils/index';
import Router from '@koa/router';
import send from 'koa-send';

const router = new Router();

router.get('/(.*)', async ctx => {
    await send(ctx, '/' + ctx.params['0'], { root: resolve('..', '..', 'static') });
});

export default router;
