// const fs = require('fs');
// const util = require('util');
// const path = require('path');
// const { getPackages } = require('@manypkg/get-packages');
// const depKeys = ['dependencies', 'devDependencies', 'peerDependencies'];

// const cwd = process.cwd();
// let init = false;
// let packageInfo;
// let packageNames;
// const loggerFilePath = path.resolve(__dirname, 'dist', 'log');

// async function write(...args) {
//     await util.promisify(fs.appendFile)(loggerFilePath, args.join(' ') + '\n', 'utf8');
// }

// async function runInit() {
//     await util.promisify(fs.writeFile)(loggerFilePath, '', 'utf8');
//     packageInfo = await getPackages(cwd);
//     init = true;
//     packageNames = new Set(
//         packageInfo.packages
//             .map(v => v.packageJson.name)
//             .concat(packageInfo.rootPackage.packageJson.name),
//     );
// }

// async function readPackage(pkg, context) {
//     if (!init) await runInit();
//     if (packageNames.has(pkg.name))
//         for (const depKey of depKeys) {
//             for (const [libName, version] of Object.entries(pkg[depKey])) {
//                 if (version.includes('catalog') || version.includes('workspace')) {
//                 } else {
//                     await write(pkg.name, libName, version);
//                 }
//             }
//         }
//     return pkg;
// }

module.exports = {
    hooks: {
        // readPackage,
    },
};
