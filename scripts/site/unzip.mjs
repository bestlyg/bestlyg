import '@bestlyg/cli/globals';

const resolve = utils.getResolveFunction(import.meta, 1);
const dirPath = resolve('packages', 'site', 'build');
const zipPath = resolve('/', 'home', 'ubuntu', 'site.zip');
const zip = new AdmZip(zipPath);
zip.extractAllTo(dirPath, true);
