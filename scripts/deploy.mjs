import '@bestlyg/cli/globals';
import { execSync } from 'child_process';

const envFileName = '.env';
const resolve = best.common.getResolveFunction(best.common.getDirname(), 1);

const { config } = best;

const run = async cmd => {
    execSync(cmd, { stdio: 'inherit' });
    // await $`${cmd}`.stdio('inherit', 'inherit', 'inherit');
};
const homePath = process.env.HOME;

const dbName = 'best_data';
const envDistPath = resolve(config.ssh.projectPath, 'packages', 'common', envFileName);
const sqlDistPath = resolve(config.ssh.projectPath, 'packages', 'common', 'dist', dbName + '.sql');
const dumpPath = resolve('dist', dbName + '.sql');

// backup
await run(`cp -rf ${resolve(homePath, '.zshrc')} ${resolve('packages', 'static', '.zshrc')}`);
// db
await run(`PGPASSWORD=root pg_dump -h localhost -p 5432 -U root -f ${dumpPath} ${dbName} -c`);

await run('pnpm --filter @bestlyg/client run deploy');
await run(`scp -r ${dumpPath} ${config.ssh.username}@${config.ssh.ip}:${sqlDistPath}`);
await run(
    `scp -r ${resolve('node_modules', '@bestlyg', 'common', envFileName)} ${config.ssh.username}@${config.ssh.ip}:${envDistPath}`,
);

const serverName = `bestlyg-server`;

const commands = [
    `cd ${config.ssh.projectPath}`,
    `sudo PGPASSWORD=root psql -d best_data -U root -h localhost -p 5432 < ${sqlDistPath}`,
    `sudo pm2 del ${serverName}`,
    `sudo git reset --hard`,
    `sudo git clean -fd`,
    `sudo git pull`,
    'sudo pnpm i --frozen-lockfile',
    `sudo pnpm --filter @bestlyg/common run prisma:generate`,
    `sudo pnpm --filter @bestlyg/common run prisma:migrate`,
    `sudo pnpm --filter @bestlyg/common run build`,
    `sudo pnpm --filter @bestlyg/cli run build`,
    `sudo pnpm --filter @bestlyg/leetcode run build`,
    `sudo pnpm --filter @bestlyg/server run build`,
    `sudo pm2 start ${config.ssh.projectPath}/packages/server/ecosystem.config.cjs`,
];
console.log("===[SERVER COMMAND]===", commands.join('\n'));
execSync(`ssh -T ${config.ssh.username}@${config.ssh.ip} "${commands.join('; ')}"`, {
    stdio: 'inherit',
});

// echo Deploy Project
// docker-compose up -d --force-recreate --build
// echo(`pm2 delete ${serverName}`);
// try {
//     await $`pm2 delete ${serverName}`;
// } catch (e) {
//     echo(e);
// }

// echo(`git reset --hard`);
// await $`git reset --hard`;
// echo(`git clean -fd`);
// await $`git clean -fd`;
// echo(`git pull`);
// await $`git pull`;
// echo(`pnpm i --frozen-lockfile --ignore-scripts`);
// await $`pnpm i --frozen-lockfile --ignore-scripts`;

// pnpm run build
// echo(`pnpm --filter leetcode build`)
// pnpm --filter leetcode build
// echo(`rm -rf ./packages/site/docs/leetcode`)
// rm -rf ./packages/site/docs/leetcode
// echo(`cp -rf ./packages/leetcode/dist ./packages/site/docs/leetcode`)
// cp -rf ./packages/leetcode/dist ./packages/site/docs/leetcode
// echo(`pnpm --filter site build`)
// pnpm --filter site build

// echo(`pnpm --filter @bestlyg/server build`);
// await $`pnpm --filter @bestlyg/server build`;

// echo(`pnpm --filter @bestlyg/server deploy:pm2`);
// await $`pnpm --filter @bestlyg/server deploy:pm2`;

// 强制重新编译容器
// docker-compose down
// docker rmi bestlyg-api
// nginx
// rm -rf /etc/nginx/conf.d
// cp -r nginx/server /etc/nginx/conf.d
// nginx -s reload
// echo(`sudo pm2 start packages/server/dist/main.js --name ${serverName}`);
// await $`sudo pm2 start packages/server/dist/main.js --name ${serverName}`;

// docker-compose up -d --force-recreate --build

// 定制镜像
// docker build -t myapp:pm2 ./backend

// 重启启动容器
// docker stop myapp
// docker rm myapp
// docker run --name myapp -p 3000:3000  -d myapp:pm2
// zip -vr ./packages/site/build/site.zip ./packages/site/build
// scp -r ./packages/site/build/site.zip ubuntu@101.34.26.179:~/site.zip
