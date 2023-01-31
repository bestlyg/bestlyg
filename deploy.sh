server=bestlyg-server
# echo Deploy Project
# docker-compose up -d --force-recreate --build
echo "pm2 delete $delete"
pm2 delete $server
echo "git pull"
git pull
echo "pnpm i"
pnpm i
# pnpm run build
echo "pnpm --filter leetcode build"
pnpm --filter leetcode build
echo "rm -rf ./packages/site/docs/leetcode"
rm -rf ./packages/site/docs/leetcode
echo "cp -rf ./packages/leetcode/dist ./packages/site/docs/leetcode"
cp -rf ./packages/leetcode/dist ./packages/site/docs/leetcode
echo "pnpm --filter site build"
pnpm --filter site build
echo "pnpm --filter server build"
pnpm --filter server build
# 强制重新编译容器
# docker-compose down
# docker rmi bestlyg-api
# nginx
# rm -rf /etc/nginx/conf.d
# cp -r nginx/server /etc/nginx/conf.d
# nginx -s reload
echo "pm2 start packages/server/dist/main.js --name $server"
pm2 start packages/server/dist/main.js --name $server

# docker-compose up -d --force-recreate --build


# 定制镜像
# docker build -t myapp:pm2 ./backend

# 重启启动容器
# docker stop myapp
# docker rm myapp
# docker run --name myapp -p 3000:3000  -d myapp:pm2