import Router, { Middleware } from '@koa/router';
import dayjs from 'dayjs';

const healthy: Middleware = ctx => {
    ctx.body = `health-check: ${dayjs().format('YYYY-MM-DD hh:mm:ss')}`;
};
const router = new Router();
router.get('/health-check', healthy);

export default router;
