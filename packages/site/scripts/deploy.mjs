import '@bestlyg/cli/globals';
import { execSync } from 'child_process';
import { ssh, server } from '@bestlyg/config';

const resolve = best.utils.getResolveFunction(import.meta, 1);
const fileName = 'site.zip';
const dirPath = resolve('dist');
const zip = new best.AdmZip();
zip.addLocalFolder(dirPath);
await zip.writeZipPromise(resolve(dirPath, fileName));

const distPath = `${server.webPath}/site/${fileName}`;

await $`scp -r ${resolve(dirPath, fileName)} ${ssh.username}@${ssh.ip}:${distPath}`.stdio(
    'inherit',
    'inherit',
);

const commands = [`cd ${path.dirname(distPath)}`, `unzip -o ${distPath}`];

execSync(`ssh -T ${ssh.username}@${ssh.ip} "${commands.join('; ')}"`, { stdio: 'inherit' });
