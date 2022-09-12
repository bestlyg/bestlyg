const path = require('path');
const fs = require('fs');

async function main() {
  console.log('=== create big file start ===');
  await run();
  console.log('=== create big file end ===');
}

const rootpath = path.resolve('./');
const dirpath = path.resolve(rootpath, './temp');
const filepath = path.resolve(dirpath, './bigfile.txt');

async function run() {
  try {
    fs.mkdirSync(dirpath);
  } catch (_) {}
  for (let i = 0; i < 500; i++) {
    console.log('add', i);
    fs.appendFileSync(
      filepath,
      new Array(1 * 1024 * 1024)
        .fill(0)
        .map(_ => Math.floor(Math.random() * 10) + '')
        .join('')
    );
  }
  console.log(fs.statSync(filepath).size / 1024 / 1024 + 'MB');
}

main();
