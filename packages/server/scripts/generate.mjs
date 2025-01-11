import '@bestlyg/cli/globals';

const resolve = best.utils.getResolveFunction(import.meta, 1);

best.dotenv.config({
    path: resolve('node_modules', '@bestlyg', 'config', '.env.local'),
});

await fs.copyFile(
    resolve('node_modules', '@bestlyg', 'data', 'prisma', 'schema.prisma'),
    resolve('schema.prisma'),
);
await $`prisma generate`.stdio('inherit', 'inherit', 'inherit');
await fs.remove(resolve('schema.prisma'));
