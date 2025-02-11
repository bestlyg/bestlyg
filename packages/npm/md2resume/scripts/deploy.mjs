import '@bestlyg/cli/globals';
import { execSync } from 'child_process';

import { getConfiguration, ConfigurationSchema } from '@bestlyg/common';

const resolve = best.utils.getResolveFunction(import.meta, 1);
best.dotenv.config({
    path: resolve('node_modules', '@bestlyg', 'common', '.env'),
});
const config = ConfigurationSchema.parse(getConfiguration(process.env));

const commands = [`rm -rf ${config.ssh.webPath}/resume`];
execSync(`ssh -T ${config.ssh.username}@${config.ssh.ip} "${commands.join('; ')}"`, {
    stdio: 'inherit',
});

echo`scp -r ${resolve('dist')} ${config.ssh.username}@${config.ssh.ip}:${config.ssh.webPath}/resume`;

$`scp -r ${resolve('dist')} ${config.ssh.username}@${config.ssh.ip}:${config.ssh.webPath}/resume`.stdio(
    'inherit',
    'inherit',
);
