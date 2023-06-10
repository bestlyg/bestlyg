module.exports = (env, argv) => {
    return {
        devtool: 'source-map',
        devServer: {
            compress: true,
            port: 9000,
        },
    };
};
