import '@bestlyg/cli/globals';
import { execSync } from 'child_process';
import { ssh, server } from '@bestlyg/config';

const resolve = best.utils.getResolveFunction(import.meta, 1);
const fileName = 'client.dist.zip';
const dirPath = resolve('dist');

execSync(`pnpm run build`, { stdio: 'inherit', cwd: resolve() });

const zip = new best.AdmZip();
zip.addLocalFolder(dirPath);

await zip.writeZipPromise(resolve(dirPath, fileName));

const distFilePath = `/root/${fileName}`;

await $`scp -r ${resolve(dirPath, fileName)} ${ssh.username}@${ssh.ip}:${distFilePath}`.stdio(
    'inherit',
    'inherit',
    'inherit',
);

const distDirPath = resolve(server.projectPath, 'packages', 'client', 'dist');

const commands = [`rm -rf ${distDirPath}`, `unzip -o ${distFilePath} -d ${distDirPath}`];
execSync(`ssh -T ${ssh.username}@${ssh.ip} "${commands.join('; ')}"`, { stdio: 'inherit' });
