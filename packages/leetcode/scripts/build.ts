import { Readme, ReadmeItem } from '@/base';
import { travel, resolve, LOGO } from '@/utils';
import dayjs from 'dayjs';
import chalk from 'chalk';
import fs from 'fs-extra';

const distpath = resolve('dist');

function writeMarkdown() {
  fs.ensureDirSync(distpath);
  fs.emptyDirSync(distpath);
  for (const item of travel()) {
    const { meta, dirname, filename, filepath } = item;
    // console.log(filepath);
    const file = [
      `# ${meta.name}`,
      ``,
      `> 链接：[${meta.name}](${meta.url})  `,
      `> 难度：${meta.difficulty}  `,
      `> 标签：${meta.tag.join('、')}  `,
      `> 简介：${meta.desc}`,
      ``,
      ...meta.solutions.map((item, i) =>
        [
          `## 题解 ${i + 1} - ${item.script}`,
          ``,
          `- 编辑时间：${dayjs(item.date).format('YYYY-MM-DD')}`,
          `- 执行用时：${item.time}ms`,
          `- 内存消耗：${item.memory}MB`,
          `- 编程语言：${item.script}`,
          `- 解法介绍：${item.desc}`,
          '',
          '```' + item.script,
          item.code,
          '```',
          '',
        ].join('\n')
      ),
    ].join('\n');
    const dirpath = resolve(distpath, dirname);
    fs.ensureDirSync(dirpath);
    fs.writeFileSync(resolve(dirpath, filename + '.md'), file);
  }
}
function writeReadme() {
  const mainpath = resolve('data/main.json');
  const meta: Readme = JSON.parse(fs.readFileSync(mainpath).toString());
  const file = [
    `# 目录索引`,
    ``,
    `## 介绍`,
    ``,
    `个人 LeetCode 题解`,
    ``,
    `总题目数: ${meta.markdownCount}`,
    `总题解数: ${meta.solutionCount}`,
    ``,
    write('顺序索引', meta.index),
    write('标签索引', meta.tag),
    write('难度索引', meta.difficulty),
  ].join('\n');
  fs.writeFileSync(resolve(distpath, 'index.md'), file);
  function write(title: string, list: ReadmeItem[]) {
    return [
      `## ${title}`,
      '',
      ...list.map(item =>
        [`### ${item.dir}`, '', ...item.list.map(name => `- ${name}`)].join('\n')
      ),
      ``,
    ].join('\n');
  }
}

function main() {
  console.log(LOGO);
  try {
    writeMarkdown();
    writeReadme();
    console.log(chalk.green('Build: SUCCESS'));
  } catch (e) {
    console.error(chalk.red('Build: ERROR'));
    console.error(e);
  }
}
main();
