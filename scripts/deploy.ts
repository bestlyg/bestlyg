import { shelljs, resolve, fs, shell, dayjs, chalk, LOGO } from './utils';

const { git, yarn } = shell;
const deployRootPath = resolve('../bestlyg-deploy');
const packageConfigs = [];
function main() {
  console.log(LOGO);
  buildDocs();
  console.log(chalk.blue(`开始部署`));
  shelljs.cd(deployRootPath);
  [
    git.pull(),
    git.addAll,
    git.commit(
      `${dayjs().format('YYYY.MM.DD')} 更新 文档、${packageConfigs
        .map(({ pkgName }) => pkgName)
        .join('、')}`
    ),
    git.push,
  ].forEach(v => shelljs.exec(v));
  console.log(chalk.green(`部署完成`));
}
main();
function buildDocs() {
  console.log(chalk.blue(`正在打包文档`));
  shelljs.exec(yarn.run(`build:docs`));
  const deployPath = resolve(deployRootPath, 'src', 'website');
  const srcPath = resolve('dist');
  fs.ensureDirSync(deployPath);
  fs.emptyDirSync(deployPath);
  fs.copySync(srcPath, deployPath);
}
