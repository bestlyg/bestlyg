import { chalk, fs } from '../utils';
import { travel } from './leetcode';

function main() {
  console.log(chalk.blue(`正在批处理LeetCode`));
  const reg = /内存消耗：(\-)?\d+(\.\d{1,2})mb/;
  for (const { filepath } of travel()) {
    let source = fs.readFileSync(filepath).toString();
    const res = reg.exec(source);
    if (!res) continue;
    const title = res[0].replace('mb', 'MB');
    fs.writeFileSync(filepath, source.replace(res[0], title));
  }
}
main();
