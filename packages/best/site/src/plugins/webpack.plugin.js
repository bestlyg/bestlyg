const path = require('path');
const fs = require('fs-extra');
/**
 * @param  {...string} p
 * @returns {string}
 */
const resolve = (...p) => path.resolve(__dirname, '../../', ...p);

function getLibAlias(name) {
    const alias = {};
    const p = resolve(`../${name}`);
    for (const lib of fs.readdirSync(p)) {
        const libpath = resolve(p, lib);
        const pkginfo = require(resolve(libpath, 'package.json'));
        alias[pkginfo.name] = resolve(libpath, 'src');
    }
    return alias;
}

module.exports = function () {
    return {
        configureWebpack(config, isServer, utils, content) {
            console.log('webpack plugin');
            console.log({
                config,
                isServer,
                utils,
                content,
            });
            console.log('ALIAS', {
                alias: {
                    ...getLibAlias('components'),
                    ...getLibAlias('packages'),
                },
            });
            return {
                cache: { type: 'filesystem' },
                // proxy: {},
                plugins: [],
                resolve: {
                    alias: {
                        ...getLibAlias('components'),
                        ...getLibAlias('packages'),
                    },
                },
            };
        },
    };
};
