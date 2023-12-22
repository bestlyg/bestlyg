import { LOGO, resolve, fs, specStr, chalk, lodash } from './utils';
const { backquote } = specStr;
const coreCodeReg = /## \[核心代码\]\((.*)\)/g;
const fileReg = /(packages\/.*\.ts(x?))/;
function main() {
  console.log(LOGO);
  console.log(chalk.blue('更新核心代码'));
  findMarkdown(resolve('packages'));
  console.log(chalk.green('更新成功'));
}


main();
function findMarkdown(dir: string): void {
  const dirs = fs.readdirSync(dir);
  dirs
    .filter(v => !v.includes('.') && v !== 'server')
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
  const list: {
    title: string;
    filePath: string;
  }[] = [];
  for (const match of matchArray) {
    const [title, link] = match;
    const { index } = match;
    if (!fileReg.test(link)) continue;
    const filePath = resolve(RegExp.$1);
    list.push({ title, filePath });
    mdMeta = mdMeta.substr(0, index);
  }
  for (const { title, filePath } of list) {
    try {
      console.log(`${lodash.repeat('=', 10)}
正在覆盖核心代码：${chalk.blue(src)},
核心代码路径：${chalk.blue(filePath)}`);
      const coreCodeData = fs.readFileSync(filePath).toString();
      mdMeta += `
${title}
${backquote}${backquote}${backquote}ts
${coreCodeData}
${backquote}${backquote}${backquote}
`;
    } catch (error) {
      console.log(chalk.red('覆盖失败'));
      console.log(error);
      return;
    }
  }
  fs.writeFileSync(src, mdMeta);
}
