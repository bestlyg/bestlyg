const { resolve } = require('./utils.js');

module.exports = (env, argv) => {
    return {
        devtool: 'source-map',
        devServer: {
            compress: true,
            port: 3001,
            proxy: {
                '/api': 'http://localhost:3000',
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
