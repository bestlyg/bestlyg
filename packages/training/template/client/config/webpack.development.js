const { resolve } = require('./utils.js');

module.exports = (env, argv) => {
    return {
        devtool: 'source-map',
        devServer: {
            compress: true,
            port: 3000,
            proxy: {
                '/api': 'http://localhost:3001',
            },
            open: false,
            hot: !false,
            liveReload: false,
            static: {
                directory: resolve('public'),
                publicPath: '/public',
            },
        },
    };
};
