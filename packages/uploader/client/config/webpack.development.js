module.exports = (env, argv) => {
    return {
        devtool: 'source-map',
        devServer: {
            compress: true,
            port: 9000,
            proxy: {
                '/api': 'http://localhost:9001',
            },
            open: false,
            hot: false,
            liveReload: !false,
        },
    };
};
