import webpackBundleAnalyzer from 'webpack-bundle-analyzer';

export const devConfig = {
    env: {
        NODE_ENV: '"development"',
    },
    defineConstants: {},
    mini: {
        webpackChain(chain, webpack) {
            // const port = 10001;
            // chain.plugin("analyzer").use(webpackBundleAnalyzer.BundleAnalyzerPlugin, [
            //   {
            //     analyzerPort: port,
            //     openAnalyzer: false,
            //   },
            // ]);
        },
    },
    h5: {
        esnextModules: ['taro-ui'],
    },
};
