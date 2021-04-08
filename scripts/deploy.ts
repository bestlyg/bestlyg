import { shelljs, resolve, fs, shell, dayjs } from './utils';
const deployPath = resolve('../bestlyg-deploy/src/bestlyg-website');
function main() {
  fs.ensureDirSync(deployPath);
  fs.emptyDirSync(deployPath);
  fs.copySync(resolve('dist'), deployPath);
  shelljs.cd(deployPath);
  [
    shell.git.pull,
    shell.git.addAll,
    shell.gitFn.commit(`${dayjs().format('YYYY.MM.DD')} 更新 bestlyg-website`),
    shell.git.push,
  ].forEach(v => shelljs.exec(v));
}
main();
