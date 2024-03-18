import 'zx/globals';

await $`pnpm --filter leetcode build`;
await $`rm -rf ./packages/site/docs/leetcode`;
await $`cp -rf ./packages/leetcode/dist ./packages/site/docs/leetcode`;
await $`pnpm --filter site build`;
await $`zip -vr ./packages/site/build/site.zip ./packages/site/build`;
await $`scp -r ./packages/site/build/site.zip ubuntu@106.54.220.193:~/site.zip `;
await $`# sudo unzip -o -d /root/bestlyg /home/ubuntu/site.zip`;
