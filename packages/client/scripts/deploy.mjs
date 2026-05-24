import { execSync } from 'child_process';
import AdmZip from 'adm-zip';
import dotenv from 'dotenv';
import {
    CWD,
    ConfigurationSchema,
    getConfiguration,
    getResolveFunction,
} from '@bestlyg/server-shared';
import { $ } from 'zx';

const resolve = getResolveFunction(CWD);
dotenv.config({ path: resolve('node_modules', '@bestlyg', 'server-shared', '.env') });
dotenv.config({ path: resolve('.env') });

const config = ConfigurationSchema.parse(getConfiguration());
const fileName = 'client.dist.zip';
const dirPath = resolve('dist');

execSync(`pnpm run build`, { stdio: 'inherit', cwd: resolve() });

const zip = new AdmZip();
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
