import '@bestlyg/cli/globals';
import { execSync } from 'child_process';
import { ssh, server } from '@bestlyg/config';

const resolve = best.utils.getResolveFunction(import.meta, 1);

const commands = [`rm -rf ${server.webPath}/resume`];
execSync(`ssh -T ${ssh.username}@${ssh.ip} "${commands.join('; ')}"`, {
    stdio: 'inherit',
});

echo`scp -r ${resolve('dist')} ${ssh.username}@${ssh.ip}:${server.webPath}/resume`;

$`scp -r ${resolve('dist')} ${ssh.username}@${ssh.ip}:${server.webPath}/resume`.stdio(
    'inherit',
    'inherit',
);
