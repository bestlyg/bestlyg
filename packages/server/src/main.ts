import { formatLogMessage } from '@bestlyg-server/common/log-message';
import { Logger } from '@nestjs/common';

const logger = new Logger('src/main');

import('./bootstrap')
    .then((mod) => mod.bootstrap())
    .catch((err) => {
        logger.error(formatLogMessage('Server Bootstrap Error', err));
    });
