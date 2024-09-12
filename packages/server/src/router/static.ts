import { logger, resolve } from '@/utils/index';
import Router from '@koa/router';
import send from 'koa-send';

const router = new Router();

router.get('/(.*)', async (ctx, next) => {
    try {
        await send(ctx, '/' + ctx.params['0'], {
            root: resolve('node_modules', '@bestlyg/', 'static'),
        });
    } catch (err) {
        logger.error('Static Router Error: ', err?.toString());
        await next();
    }
});

export default router;
