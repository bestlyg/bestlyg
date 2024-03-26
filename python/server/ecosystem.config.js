module.exports = {
    apps: [
        {
            name: 'server',
            script: 'gunicorn',
            args: '-c gunicorn.config.py main:app',
            instances: 'max',
            exec_mode: 'cluster',
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            interpreter: 'python3',
        },
    ],
};
