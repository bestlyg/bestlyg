const best = require('@bestlyg/cli');
const resolve = best.utils.getResolveFunction(__dirname);

module.exports = {
    apps: [
        {
            name: 'bestlyg-server',
            script: resolve('dist', 'main.js'),
            interpreter: 'node',
            // interpreter_args: '--input-type=module',
            env: {
                NODE_ENV: 'production',
            },
            // env_production: {
            //     NODE_ENV: 'production',
            // },
            // env_development: {
            //     NODE_ENV: 'development',
            // },
            // script: 'pnpm start:prod',
        },
    ],
};
