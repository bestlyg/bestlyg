import '@bestlyg/cli/globals';
import { ssh, server } from '@bestlyg/config';

const resolve = utils.getResolveFunction(import.meta, 1);
$`scp -r ${resolve('build')} ${ssh.username}@${ssh.ip}:${
    server.webPath
}/site`.stdio('inherit', 'inherit');
