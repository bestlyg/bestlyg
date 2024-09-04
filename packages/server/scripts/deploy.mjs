import '@bestlyg/cli/globals';
import { execSync } from 'child_process';
import { ssh, server } from '@bestlyg/config';

const commands = [`cd ${server.projectPath}`, `pnpm -w script deploy`];

execSync(`ssh -T ${ssh.username}@${ssh.ip} "${commands.join('; ')}"`, {
    stdio: 'inherit',
});
