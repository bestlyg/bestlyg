import { shelljs, resolve, fs, shell, moment, chalk } from './utils';

const { Git, Yarn } = shell;
const deployRootPath = resolve('../bestlyg-deploy');
const packageConfigs = [
  {
    pkgName: 'website',
  },
];
function main() {
  packageConfigs.forEach(({ pkgName }) => {
    const libName = `@bestlyg/${pkgName}`;
    console.log(chalk.blue(`正在打包${libName}`));
    shelljs.exec(Yarn.workspaceRun(libName, 'build'));
    const deployPath = resolve(deployRootPath, 'src', pkgName);
    const srcPath = resolve('packages', pkgName, 'dist');
    fs.ensureDirSync(deployPath);
    fs.emptyDirSync(deployPath);
    fs.copySync(srcPath, deployPath);
  });
  console.log(chalk.blue(`开始部署`));
  shelljs.cd(deployRootPath);
  [
    Git.pull,
    Git.addAll,
    Git.commit(
      `${moment().format('YYYY.MM.DD')} 更新 ${packageConfigs
        .map(({ pkgName }) => pkgName)
        .join('、')}`
    ),
    Git.push,
  ].forEach(v => shelljs.exec(v));
  console.log(chalk.green(`部署完成`));
}
main();
