import '@bestlyg/cli/globals';
import { execSync } from 'child_process';

const resolve = best.common.getResolveFunction(best.common.CWD);
const { config } = best;
const fileName = 'client.dist.zip';
const dirPath = resolve('dist');

execSync(`pnpm run build`, { stdio: 'inherit', cwd: resolve() });

const zip = new best.AdmZip();
zip.addLocalFolder(dirPath);

await zip.writeZipPromise(resolve(dirPath, fileName));

const distFilePath = `/root/${fileName}`;

await $`scp -r ${resolve(dirPath, fileName)} ${config.ssh.username}@${config.ssh.ip}:${distFilePath}`.stdio(
    'inherit',
    'inherit',
    'inherit',
);

const distDirPath = resolve(config.ssh.projectPath, 'packages', 'client', 'dist');

const commands = [`rm -rf ${distDirPath}`, `unzip -o ${distFilePath} -d ${distDirPath}`];
execSync(`ssh -T ${config.ssh.username}@${config.ssh.ip} "${commands.join('; ')}"`, {
    stdio: 'inherit',
});
