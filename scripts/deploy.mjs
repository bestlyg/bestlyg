import 'zx/globals';

const serverName = `bestlyg-server`;
// echo Deploy Project
// docker-compose up -d --force-recreate --build
echo(`pm2 delete ${serverName}`);
try {
    await $`pm2 delete ${serverName}`;
} catch (e) {
    echo(e);
}
echo(`git reset --hard`)
await $`git reset --hard`
echo(`git pull`);
await $`git pull`;
echo(`pnpm i --frozen-lockfile`);
await $`pnpm i --frozen-lockfile`;
// pnpm run build
// echo(`pnpm --filter leetcode build`)
// pnpm --filter leetcode build
// echo(`rm -rf ./packages/site/docs/leetcode`)
// rm -rf ./packages/site/docs/leetcode
// echo(`cp -rf ./packages/leetcode/dist ./packages/site/docs/leetcode`)
// cp -rf ./packages/leetcode/dist ./packages/site/docs/leetcode
// echo(`pnpm --filter site build`)
// pnpm --filter site build
echo(`pnpm --filter server build`);
await $`pnpm --filter server build`;
// 强制重新编译容器
// docker-compose down
// docker rmi bestlyg-api
// nginx
// rm -rf /etc/nginx/conf.d
// cp -r nginx/server /etc/nginx/conf.d
// nginx -s reload
echo(`pm2 start packages/server/dist/main.js --name ${serverName}`);
await $`pm2 start packages/server/dist/main.js --name ${serverName}`;

// docker-compose up -d --force-recreate --build

// 定制镜像
// docker build -t myapp:pm2 ./backend

// 重启启动容器
// docker stop myapp
// docker rm myapp
// docker run --name myapp -p 3000:3000  -d myapp:pm2
// zip -vr ./packages/site/build/site.zip ./packages/site/build
// scp -r ./packages/site/build/site.zip ubuntu@101.34.26.179:~/site.zip
