const fs = require('fs-extra');
const { spawnSync } = require('child_process');
const { resolve } = require('../utils');

function resolveLeetcode() {
  const path = resolve('../leetcode/dist');
  const dist = resolve('./docs/leetcode');
  spawnSync('pnpm --filter leetcode build');
  fs.ensureDirSync(dist);
  fs.emptyDirSync(dist);
  fs.copySync(path, dist, {
    recursive: true,
  });
}

function main() {
  console.log('Site Pre Build');
  try {
    resolveLeetcode();
    console.log('Site Pre Build Success');
  } catch (e) {
    console.error('Site Pre Build Error');
    console.error(e);
  }
}
main();
