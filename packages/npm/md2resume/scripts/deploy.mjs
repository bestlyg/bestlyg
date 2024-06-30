import '@bestlyg/cli/globals';
import { ssh, server } from '@bestlyg/config';

const resolve = utils.getResolveFunction(import.meta, 1);
$`scp -r ${resolve('dist')} ${ssh.username}@${ssh.ip}:${server.webPath}/resume`.stdio('inherit');
