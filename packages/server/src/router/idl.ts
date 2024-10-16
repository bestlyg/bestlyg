import Router from '@koa/router';
import * as IdlServer from '@bestlyg/idl/server';

const router = new Router();

router[IdlServer.api.bestlyg.BestlygService.HealthCheck.method](
    IdlServer.api.bestlyg.BestlygService.HealthCheck.url,
    ctx => {
        const query: IdlServer.api.bestlyg.BestlygService.HealthCheck.Request = ctx.query;
        const data: IdlServer.api.bestlyg.BestlygService.HealthCheck.Response = {
            code: 0,
            data: query.env,
        };
        ctx.body = data;
    },
);

export default router;
