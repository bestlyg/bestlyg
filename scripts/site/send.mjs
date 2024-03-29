import 'zx/globals';

await $`scp -r ./packages/site/build/site.zip ubuntu@106.54.220.193:~/site.zip`;
