import '@bestlyg/cli/globals';
import { execSync } from 'child_process';
import { ServerConfigurationSchema, getConfiguration } from '@bestlyg/common';

const resolve = best.utils.getResolveFunction(import.meta, 1);
best.dotenv.config({
    path: resolve('node_modules', '@bestlyg', 'config', '.env.local'),
});
const config = ServerConfigurationSchema.parse(getConfiguration(process.env));
const fileName = '.env.local';
const dbName = 'best_data';

const envDistPath = resolve(config.ssh.projectPath, 'packages', 'config', fileName);

const sqlDistPath = resolve(config.ssh.projectPath, 'packages', 'data', 'dist', dbName + '.sql');

// await `psql -d best_data -U root -h localhost -p 5432 < ~/Desktop/best_data.sql`
const dumpPath = resolve('dist', dbName + '.sql');

await $`pg_dump -h localhost -p 5432 -U root -f ${dumpPath} ${dbName} -c`.stdio(
    'inherit',
    'inherit',
    'inherit',
);

await $`scp -r ${dumpPath} ${config.ssh.username}@${config.ssh.ip}:${sqlDistPath}`.stdio(
    'inherit',
    'inherit',
    'inherit',
);

await $`scp -r ${resolve('node_modules', '@bestlyg', 'config', fileName)} ${config.ssh.username}@${config.ssh.ip}:${envDistPath}`.stdio(
    'inherit',
    'inherit',
    'inherit',
);

const commands = [
    `cd ${config.config.ssh.projectPath}/packages/data`,
    `pnpm prisma generate`,
    `pnpm --filter @bestlyg/data run build`,
    `PGPASSWORD=root psql -d best_data -U root -h localhost -p 5432 < ${sqlDistPath}`,
];

execSync(`ssh -T ${config.ssh.username}@${config.ssh.ip} "${commands.join('; ')}"`, {
    stdio: 'inherit',
});
