import '@bestlyg/cli/globals';
import { execSync } from 'child_process';
import { ssh, server } from '@bestlyg/config';

const resolve = best.utils.getResolveFunction(import.meta, 1);
const fileName = '.env.local';
const distPath = `/root/bestlyg/packages/config/${fileName}`;
await $`scp -r ${resolve('node_modules', '@bestlyg', 'config', fileName)} ${ssh.username}@${ssh.ip}:${distPath}`.stdio(
    'inherit',
    'inherit',
);

const commands = [
    `cd ${server.projectPath}/packages/data`,
    `pnpm prisma generate`,
    `pnpm --filter @bestlyg/data run build`,
];

execSync(`ssh -T ${ssh.username}@${ssh.ip} "${commands.join('; ')}"`, {
    stdio: 'inherit',
});
