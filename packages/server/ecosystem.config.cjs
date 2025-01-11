module.exports = {
    apps: [
        {
            name: 'bestlyg-server',
            // script: './scripts/deploy-pm2.js',
            // interpreter: 'node',
            // interpreter_args: '--input-type=module',
            // env_production: {
            //     NODE_ENV: 'production',
            // },
            // env_development: {
            //     NODE_ENV: 'development',
            // },
            script: 'pnpm start:prod',
        },
    ],
};
