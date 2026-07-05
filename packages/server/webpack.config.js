const pkgs = require('./package.json');
const externalDependencies = Object.keys(pkgs.dependencies).filter(
    (name) => !name.startsWith('@bestlyg/'),
);

module.exports = function (options) {
    console.log('===>Webpack', options);
    return {
        ...options,
        devtool: 'source-map',
        // mode: 'production',
        // optimization: { minimize: false },
        externals: [...options.externals, ...externalDependencies],
    };
};
