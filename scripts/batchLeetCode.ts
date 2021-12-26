import { chalk, leetcode, fs } from './utils';

const { travel } = leetcode;

function main() {
  console.log(chalk.blue(`正在批处理LeetCode`));
  const reg = /title: (.*)/;
  for (const { filepath } of travel()) {
    let source = fs.readFileSync(filepath).toString();
    const res = reg.exec(source);
    if (!res) continue;
    const title = res[1];
    if (title.includes('. ')) continue;
    source = source.replace(title, title.replace('.', '. '));
    fs.writeFileSync(filepath, source);
  }
}
main();
