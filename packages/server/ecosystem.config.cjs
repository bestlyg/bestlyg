const best = require('@bestlyg/cli');
const resolve = best.utils.getResolveFunction(__dirname);
console.log(resolve());

module.exports = {
    apps: [
        {
            name: 'bestlyg-server',
            script: resolve('scripts', 'deploy-pm2.js'),
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
