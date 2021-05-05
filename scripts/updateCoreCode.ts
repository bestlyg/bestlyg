import { LOGO, resolve, fs, specStr, chalk } from './utils';
const { backquote } = specStr;
const coreCodeReg = /## \[核心代码\]\((.*)\)/g;
const fileReg = /(packages\/.*\.ts(x?))/;
function main() {
  console.log(LOGO);
  console.log(chalk.blue('更新核心代码'));
  findMarkdown(resolve('packages'));
}
main();
function findMarkdown(dir: string): void {
  const dirs = fs.readdirSync(dir);
  dirs
    .filter(v => !v.includes('.'))
    .forEach(subDir => {
      findMarkdown(resolve(dir, subDir));
    });
  dirs
    .filter(v => v.endsWith('.md'))
    .map(v => resolve(dir, v))
    .forEach(md => updateMarkdown(md));
}
function updateMarkdown(src: string) {
  let mdMeta = fs.readFileSync(src).toString();
  const matchArray = mdMeta.matchAll(coreCodeReg);
  for (const match of matchArray) {
    const [title, link] = match;
    const { index } = match;
    try {
      console.log('正在覆盖核心代码:', chalk.blue(src));
      if (!fileReg.test(link)) return;
      const srcPath = resolve(RegExp.$1);
      console.log('核心代码路径:', chalk.blue(srcPath));
      const coreCodeData = fs.readFileSync(srcPath).toString();
      mdMeta =
        mdMeta.substr(0, index) +
        `
${title}
${backquote}${backquote}${backquote}ts
${coreCodeData}
${backquote}${backquote}${backquote}
        `;
      fs.writeFileSync(src, mdMeta);
      console.log(chalk.green('覆盖成功'));
    } catch (error) {
      console.log(chalk.red('覆盖失败'));
      console.log(error);
    }
  }
}
