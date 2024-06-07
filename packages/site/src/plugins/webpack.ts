export function bestlygWebpackDocusaurusPlugin(context, options) {
    return {
        name: 'bestlyg-webpack-docusaurus-plugin',
        configureWebpack(config, isServer, utils) {
            // console.log('@bestlyg/data', require.resolve('@bestlyg/data'), config);
            const { getJSLoader } = utils;
            return {
                alias: {
                    // '@bestlyg/data': require.resolve('@bestlyg/data'),
                },
            };
        },
    };
}
