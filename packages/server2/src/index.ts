import Koa from 'koa';
import { logger } from './utils/index';

async function bootstrap() {
    const app = new Koa();
    const port = 10000;
    app.listen(port, () => {
        logger.info(`Server is running at ${port}`);
    });
}

bootstrap().catch(err => {
    logger.error(`Server Error: ${err?.toString() ?? 'unknown error'}`);
});
