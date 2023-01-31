import chalk from 'chalk';
import fs from 'fs-extra';
import { resolve, travel, LOGO } from '@/utils';
import { Markdown, Solution } from '@/base';
import { fetchAllQuestions, fetchQuestionData } from './api';

function main() {
  console.log(LOGO);
  console.log(chalk.blue(`正在批处理LeetCode`));
  for (const { filepath } of travel()) {
    const obj: Markdown = JSON.parse(fs.readFileSync(filepath).toString());

    // obj.name = obj.name.replace(/ /g, '');
    // fs.writeFileSync(filepath, JSON.stringify(obj, null, 4));
    break;
  }

  fetchAllQuestions().then(res => {
    console.log(res);
  });
  fetchQuestionData().then(res => {
    console.log(res);
  });
}
main();
