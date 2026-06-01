const { getResolveFunction } = require('@bestlyg/server-shared');

// PM2 may be launched from another directory, so pin both PM2 cwd and BEST_CWD.
const resolve = getResolveFunction(__dirname);

module.exports = {
    apps: [
        {
            name: 'bestlyg-server',
            cwd: __dirname,
            script: resolve('dist', 'main.js'),
            interpreter: 'node',
            // interpreter_args: '--input-type=module',
            env: {
                BEST_CWD: __dirname,
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
