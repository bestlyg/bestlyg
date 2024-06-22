import '@bestlyg/cli/globals';

const resolve = utils.getResolveFunction(import.meta, 2);
const zipPath = resolve('/', 'home', 'ubuntu', 'site.zip');
const zip = new AdmZip(zipPath);
zip.extractAllTo(resolve(), true);
