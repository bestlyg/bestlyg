import chalk from 'chalk';
import dayjs from 'dayjs';
import fs from 'fs-extra';
import { Markdown, Solution } from '@/base';
import {
  analysisFileName,
  rootPath,
  findLastSolutionIdx,
  backquote,
  LOGO,
  resolve,
  trimBlank,
} from '@/utils';
import md from './leetCodeMarkdown';

const descFormat = (str: string) => (str.endsWith('。') ? str : str + '。');
const { dirname } = analysisFileName(md.name);
const dirpath = resolve(rootPath, dirname);
const filepath = resolve(dirpath, trimBlank(md.name) + '.json');

function main() {
  console.log(chalk.blue(`正在生成LeetCode题解`));
  console.log(LOGO);
  transform();
  let markdown = {} as Markdown;
  if (md.exist) {
    markdown = fs.readJsonSync(filepath);
    markdown.solutions.push(...md.solutions);
  } else {
    markdown = { ...md };
    delete markdown.exist;
  }
  fs.ensureDirSync(resolve(filepath, '../'));
  fs.writeFileSync(filepath, JSON.stringify(markdown, null, 4));
  console.log(chalk.blue(`${md.name}生成完成`));
  console.log(chalk.green(`生成完成`));
}
function transform() {
  md.name = md.name.replace(/ /g, '');
  md.desc = descFormat(md.desc);
  for (const s of md.solutions) {
    s.date = new Date(dayjs().format('YYYY.MM.DD')).getTime();
    s.desc = descFormat(s.desc);
  }
}
main();
