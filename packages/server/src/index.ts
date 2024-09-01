import Koa from 'koa';
import koaBodyParsers from 'koa-body-parsers';
import compress from 'koa-compress';
import { PORT, logger, sendMail } from './utils/index';
import { router } from './router/index';
import { scheduler } from './schedules/index';

function sendMailWhenStartSuccess() {
    sendMail(
        ['1057966749@qq.com'],
        `服务启动通知`,
        `
<h1>PROCESS.ENV</h1>
${Object.entries(process.env)
    .filter(([k]) => k.startsWith('BESTLYG'))
    .map(([k, v]) => `${k.padEnd(10)} : ${v}`)
    .map(item => `<div>${item}</div>`)
    .join('\n')}
`.trim(),
    );
}

async function bootstrap() {
    const app = new Koa();
    app.use(compress({}));
    koaBodyParsers(app);
    app.use(router.routes());
    app.use(router.allowedMethods());
    // app.use(async (ctx, next) => {
    //     await next();
    // });
    // app.use(ctx => {
    //     ctx.body = 'Welcome to my server for bestlyg.';
    // });
    app.listen(PORT, () => {
        scheduler.start();
        logger.info(`Server is running at ${PORT}`);
        sendMailWhenStartSuccess();
    });
}

bootstrap().catch(err => {
    logger.error(`Server run error: ${err?.toString() ?? 'unknown error'}`);
});
