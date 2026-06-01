const pkgs = require('./package.json');

module.exports = function (options) {
    console.log('===>Webpack', options);
    return {
        ...options,
        devtool: 'source-map',
        // mode: 'production',
        // optimization: { minimize: false },
        externals: [...options.externals, ...Object.keys(pkgs.dependencies)],
    };
};
