import { execSync } from 'child_process';
import dotenv from 'dotenv';
import { $, echo } from 'zx';

import {
    getConfiguration,
    ConfigurationSchema as ServerConfigurationSchema,
    getDirname,
    getResolveFunction,
} from '@bestlyg/server-shared';

const resolve = getResolveFunction(getDirname(import.meta.url), 1);
dotenv.config({
    path: resolve('node_modules', '@bestlyg', 'server-shared', '.env'),
});
const config = ServerConfigurationSchema.parse(getConfiguration());

const commands = [`rm -rf ${config.ssh.webPath}/resume`];
execSync(`ssh -T ${config.ssh.username}@${config.ssh.ip} "${commands.join('; ')}"`, {
    stdio: 'inherit',
});

echo(
    `scp -r ${resolve('dist')} ${config.ssh.username}@${config.ssh.ip}:${config.ssh.webPath}/resume`,
);

await $`scp -r ${resolve('dist')} ${config.ssh.username}@${config.ssh.ip}:${config.ssh.webPath}/resume`.stdio(
    'inherit',
    'inherit',
);
