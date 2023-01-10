import { chalk, fs } from '../utils';
import { travel } from './leetcode';

function main() {
  console.log(chalk.blue(`正在批处理LeetCode`));
  for (const { filepath } of travel()) {
    console.log('=========');
    console.log(filepath);
    let source = fs.readFileSync(filepath).toString();
    const linkReg = /> 链接：\[(.*?)\]\((.*?)\).*?\n/;
    if (linkReg.test(source)) {
      console.log(`name = ${RegExp.$1}`);
      console.log(`url = ${RegExp.$2}`);
    }
    const difReg = /> 难度：(.*?)\n/;
    if (difReg.test(source)) {
      console.log(`dif = ${RegExp.$1}`);
    }
    const tagReg = /> 标签：(.*?)\n/;
    if (tagReg.test(source)) {
      console.log(`tag = ${RegExp.$1.split('、')}`);
    }
    const descReg = /> 简介：(.*?)\n/;
    if (descReg.test(source)) {
      console.log(`desc = ${RegExp.$1}`);
    }
    for (let i = 1; ; i++) {
      const solutionReg = new RegExp(
        `## 题解 ${i} - .*?\\n\\n- 编辑时间：(.*?)\\n- 执行用时：(.*?)\\n- 内存消耗：(.*?)\\n- 编程语言：(.*?)\\n- 解法介绍：(.*?)\\n\\n\`\`\`.*?\\n([\\s\\S]*?)\`\`\``
      );
      if (!solutionReg.test(source)) break;
      console.log(`=> Solution ${i}`);
      console.log(`cnt = ${i}`);
      console.log(`date = ${RegExp.$1}`);
      console.log(`time = ${RegExp.$2}`);
      console.log(`cost = ${RegExp.$3}`);
      console.log(`lang = ${RegExp.$4}`);
      console.log(`desc = ${RegExp.$5}`);
      console.log(`code = ${RegExp.$6}`);
    }
    break;
    // fs.writeFileSync(filepath, source.replace(res[0], title));
  }
}
main();
