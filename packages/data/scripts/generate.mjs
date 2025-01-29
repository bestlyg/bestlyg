import '@bestlyg/cli/globals';

const resolve = best.utils.getResolveFunction(import.meta, 1);

best.dotenv.config({
    path: resolve('node_modules', '@bestlyg', 'config', '.env.local'),
});

await $`prisma generate`.stdio('inherit', 'inherit', 'inherit');
