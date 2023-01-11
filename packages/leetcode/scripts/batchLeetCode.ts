import chalk from 'chalk';
import fs from 'fs-extra';
import { resolve, travel } from '@/utils';
import { Markdown, Solution } from '@/base';

function main() {
  console.log(chalk.blue(`正在批处理LeetCode`));
  for (const { filepath } of travel()) {
    if (!filepath.endsWith(`2283.判断一个数的数字计数是否等于数位的值.md`)) continue;
    const obj = {} as any as Markdown;
    console.log('=========');
    console.log(filepath);
    let source = fs.readFileSync(filepath).toString();
    const linkReg = /> 链接：\[(.*?)\]\((.*?)\).*?\n/;
    if (linkReg.test(source)) {
      console.log(`name = ${RegExp.$1}`);
      console.log(`url = ${RegExp.$2}`);
      obj.name = RegExp.$1.trim();
      obj.url = RegExp.$2.trim();
    }
    const difReg = /> 难度：(.*?)\n/;
    if (difReg.test(source)) {
      console.log(`dif = ${RegExp.$1 as any}`);
      obj.difficulty = RegExp.$1.trim() as any;
    }
    const tagReg = /> 标签：(.*?)\n/;
    if (tagReg.test(source)) {
      console.log(`tag = ${RegExp.$1.split('、') as any}`);
      obj.tag = RegExp.$1.split('、').map(v => v.trim()) as any;
    }
    const descReg = /> 简介：(.*?)\n/;
    if (descReg.test(source)) {
      console.log(`desc = ${RegExp.$1}`);
      obj.desc = RegExp.$1.trim();
    }
    obj.solutions = [];
    for (let i = 1; ; i++) {
      const solutionReg = new RegExp(
        `## 题解 ${i} - .*?\\n\\n- 编辑时间：(.*?)\\n- 执行用时：(.*?)ms\\n- 内存消耗：(.*?)MB\\n- 编程语言：(.*?)\\n- 解法介绍：(.*?)\\n\\n\`\`\`.*?\\n([\\s\\S]*?)\`\`\``
      );
      if (!solutionReg.test(source)) break;
      const s = {} as Solution;
      obj.solutions.push(s);
      console.log(`=> Solution ${i}`);
      console.log(`cnt = ${i}`);
      console.log(`date = ${RegExp.$1 as any}`);
      console.log(`time = ${RegExp.$2}`);
      console.log(`cost = ${RegExp.$3}`);
      console.log(`lang = ${RegExp.$4}`);
      console.log(`desc = ${RegExp.$5}`);
      console.log(`code = ${RegExp.$6}`);
      s.date = new Date(RegExp.$1.trim()).getTime();
      s.time = +RegExp.$2.trim() as any;
      s.memory = +RegExp.$3.trim() as any;
      s.script = RegExp.$4.trim() as any;
      s.desc = RegExp.$5.trim() as any;
      s.code = RegExp.$6.trim();
    }
    console.log(`path = ${filepath}`);
    const newpath = filepath.replace('temp', 'data').replace('.md', '.json');
    console.log(newpath, resolve(newpath, '..'));
    fs.ensureDirSync(resolve(newpath, '..'));
    console.log(JSON.stringify(obj, null, 4));
    fs.writeFileSync(newpath, JSON.stringify(obj, null, 4));
  }
}
main();
