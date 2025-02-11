import '@bestlyg/cli/globals';
import { execSync } from 'child_process';
import { getConfiguration, ConfigurationSchema } from '@bestlyg/common';

best.dotenv.config({
    path: resolve('node_modules', '@bestlyg', 'common', '.env'),
});
const config = ConfigurationSchema.parse(getConfiguration(process.env));
const resolve = best.utils.getResolveFunction(import.meta, 1);
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
execSync(`ssh -T ${config.ssh.username}@${config.ssh.ip} "${commands.join('; ')}"`, { stdio: 'inherit' });
