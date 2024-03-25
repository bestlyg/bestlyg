import 'zx/globals';

await $`pnpm nx build site`;
await $`zip -vr ./packages/site/build/site.zip ./packages/site/build`;
await $`scp -r ./packages/site/build/site.zip ubuntu@106.54.220.193:~/site.zip`;
await $`# sudo unzip -o -d /root/bestlyg /home/ubuntu/site.zip`;
