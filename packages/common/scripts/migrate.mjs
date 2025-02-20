import '@bestlyg/cli/globals';

const resolve = best.utils.getResolveFunction(import.meta, 1);

best.dotenv.config({
    path: resolve('node_modules', '@bestlyg', 'common', '.env'),
});

const name = argv._[0];

await $`prisma migrate dev --name ${name}`.stdio('inherit', 'inherit', 'inherit');
