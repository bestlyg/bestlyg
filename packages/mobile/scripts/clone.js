const { args, chalk, resolve, fs } = require('./utils');

const fileterSet = new Set(['.git', 'node_modules', 'dist']);

function main() {
  const { name } = args;
  if (!name) {
    console.log(chalk.red('need name'));
    return;
  }
  const srcPath = resolve();
  const destPath = resolve('../', name);
  console.log('COPY : ' + chalk.blue(`${srcPath} -> ${destPath}`));
  const dirs = fs.readdirSync(srcPath).filter(name => !fileterSet.has(name));
  for (const dir of dirs) {
    const src = resolve(srcPath, dir);
    const dest = resolve(destPath, dir);
    console.log('COPY : ' + chalk.blue(`${dir}`));
    fs.copySync(src, dest);
  }
}

main();
