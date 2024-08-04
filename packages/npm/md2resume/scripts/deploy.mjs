import '@bestlyg/cli/globals';
import { ssh, server } from '@bestlyg/config';

const resolve = best.utils.getResolveFunction(import.meta, 1);

echo`scp -r ${resolve('dist')} ${ssh.username}@${ssh.ip}:${server.webPath}/resume`;

$`scp -r ${resolve('dist')} ${ssh.username}@${ssh.ip}:${server.webPath}/resume`.stdio(
    'inherit',
    'inherit'
);
