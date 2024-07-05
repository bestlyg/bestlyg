import '@bestlyg/cli/globals';
import { ssh, server } from '@bestlyg/config';

const resolve = utils.getResolveFunction(import.meta, 1);

const dirPath = resolve('dist');
const zip = new AdmZip();
zip.addLocalFolder(dirPath);
await zip.writeZipPromise(resolve(dirPath, 'site.zip'));

await $`scp -r ${resolve('dist', 'site.zip')} ${ssh.username}@${ssh.ip}:${
    server.webPath
}/site/site.zip`.stdio('inherit', 'inherit');
