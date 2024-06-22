import '@bestlyg/cli/globals';

const resolve = utils.getResolveFunction(import.meta, 2);
const dirPath = resolve('packages', 'site', 'build');
const zip = new AdmZip();
zip.addLocalFolder(dirPath);
await zip.writeZipPromise(resolve(dirPath, 'site.zip'));