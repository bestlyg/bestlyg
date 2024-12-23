import jwt from 'jsonwebtoken';
import Router from '@koa/router';
import dayjs from 'dayjs';
import { jwtOptions, passportMiddleware } from '@/auth/passport';
import { USERNAME, PASSWORD, prisma } from '@/utils/index';

const router = new Router();

const healthy: Router.Middleware = ctx => {
    ctx.body = `health-check: ${dayjs().format('YYYY-MM-DD hh:mm:ss')}`;
};
router.get('/health-check', healthy);

router.post('/login', async ctx => {
    const { username, password } = ctx.request.body as { username: string; password: string };
    if (username === USERNAME && password === PASSWORD) {
        const token = jwt.sign({ username: USERNAME }, jwtOptions.secretOrKey, {
            expiresIn: '120 days',
        });
        ctx.body = {
            code: 0,
            data: { token },
        };
    } else {
        ctx.body = {
            code: 1,
            msg: '用户名或密码错误',
        };
    }
});

router.get('/user-info', passportMiddleware, async ctx => {
    ctx.body = {
        code: 0,
        data: ctx.state.user,
    };
});

router.get('/data/ledger', passportMiddleware, async ctx => {
    const data = await prisma.ledger.findMany();
    ctx.body = {
        code: 0,
        data,
    };
});

router.get('/data/xuan', passportMiddleware, async ctx => {
    const data = await prisma.xuan.findMany();
    ctx.body = {
        code: 0,
        data,
    };
});

router.get('/data/secrets', passportMiddleware, async ctx => {
    const data = await prisma.secrets.findMany();
    ctx.body = {
        code: 0,
        data,
    };
});

router.get('/data/leetcode', passportMiddleware, async ctx => {
    const data = await prisma.leetcodeProblem.findMany({ include: { solutions: {} } });
    ctx.body = {
        code: 0,
        data,
    };
});

export default router;

// curl -X POST http://localhost:10000/api/login -d '{"username":"X","password":"X"}' -H 'Content-Type: application/json'
// curl -X GET http://localhost:10000/api/user-info -H "Authorization: Bearer X"
