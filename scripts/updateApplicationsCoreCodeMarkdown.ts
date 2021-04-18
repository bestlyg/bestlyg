import { LOGO, resolve, fs, specStr, chalk } from './utils';
const { backquote } = specStr;
const srcPath = resolve('packages', 'applications', 'src');
const ignoreDirSet = new Set(['components', 'index.ts', 'index.less']);
const coreCodeReg = '## 核心代码';
function main() {
  console.log(LOGO);
  const dirs = fs.readdirSync(srcPath).filter(v => !ignoreDirSet.has(v));
  dirs.forEach(v => {
    console.log(chalk.blue(`正在覆盖核心代码：${v}`));
    updateApplication(v);
    console.log(chalk.green(`覆盖完成`));
  });
}
main();
function updateApplication(dir: string) {
  const path = `${srcPath}/${dir}`;
  const dirs = fs.readdirSync(path);
  const coreCode = dirs.find(v => v.startsWith('use'));
  const coreCodeData = fs.readFileSync(`${path}/${coreCode}`).toString();
  const md = dirs.find(v => v.endsWith('.md'));
  let mdData = fs.readFileSync(`${path}/${md}`).toString();
  const coreCodeIndex = mdData.indexOf(coreCodeReg);
  if (coreCodeIndex === -1) return;
  mdData =
    mdData.substr(0, coreCodeIndex) +
    `
## 核心代码
${backquote}${backquote}${backquote}ts
${coreCodeData}
${backquote}${backquote}${backquote}
`;
  fs.writeFileSync(`${path}/${md}`, mdData);
}
