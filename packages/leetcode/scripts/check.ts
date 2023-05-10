import chalk from 'chalk';
import fs from 'fs-extra';
import { resolve, travel, LOGO, analysisFileName } from '@/utils';
import { Markdown, Difficulty, Tag } from '@/base';
import { AllQuestionsItem, fetchAllQuestions, fetchQuestionData } from './api';
import { rootPath } from '../src/utils';

function getTitleSlug(url: string) {
  const reg = new RegExp(`https://leetcode.cn/problems/(.*)`);
  const res = url.match(reg);
  if (!res) {
    console.log(res);
    throw new Error('unknown title slug');
  }
  return res[1].replace(/\//g, '');
}
async function allQuestions() {
  const res = await fetchAllQuestions();
  const map: Record<string, AllQuestionsItem> = {};
  for (const item of res.allQuestionsBeta) {
    map[item.questionId] = item;
  }
  return map;
}
const difficultyMap = {
  Easy: Difficulty.简单,
  Medium: Difficulty.中等,
  Hard: Difficulty.困难,
};
const log = (k: string, v: string) => console.log(`${k.padEnd(18)} : ${v}`);
function clear() {
  const dirs = fs.readdirSync(rootPath).filter(v => v !== 'main.json');
  for (const dir of dirs) {
    const dirpath = resolve(rootPath, dir);
    const files = fs.readdirSync(dirpath);
    if (files.length === 0) {
      fs.removeSync(dirpath);
    }
  }
}
async function walk({
  map,
  filepath,
}: {
  map: Record<string, AllQuestionsItem>;
  filepath: string;
}) {
  let obj: Markdown = JSON.parse(fs.readFileSync(filepath).toString());
  console.log(`=====【${obj.name}】=====`);
  log(`path`, `${filepath}`);
  obj.url = obj.url.replace('leetcode-cn.com', 'leetcode.cn');
  while (obj.url.endsWith('/')) obj.url = obj.url.substring(0, obj.url.length - 1);
  const titleSlug = getTitleSlug(obj.url);
  log(`url`, `${obj.url}`);
  log(`titleSlug`, `${titleSlug}`);
  const res = (await fetchQuestionData({ titleSlug })).question;
  const data = map[res.questionId];
  log(`questionId`, `${res.questionId}`);
  obj.id = res.questionId;
  delete obj.id;
  obj = { id: res.questionId, ...obj };
  log(`questionFrontendId`, `${res.questionFrontendId}`);
  log(`translatedTitle`, `${res.translatedTitle}`);
  obj.name = `${res.questionFrontendId}.${data.translatedTitle}`.replace(/ /g, '');
  log(`name`, `${obj.name}`);
  obj.tag.length = 0;
  for (const tag of res.topicTags) obj.tag.push(tag.translatedName as Tag);
  obj.difficulty = difficultyMap[res.difficulty];
  fs.removeSync(filepath);
  const nextFilepath = resolve(rootPath, analysisFileName(obj.name).dirname, obj.name + '.json');
  log(`path`, `${nextFilepath}`);
  fs.ensureDirSync(resolve(nextFilepath, '../'));
  fs.writeFileSync(nextFilepath, JSON.stringify(obj, null, 4));
}

type AsyncFunction = (...args: any[]) => Promise<any>;
class AsyncQueue {
  start = false;
  current = 0;
  queue: AsyncFunction[] = [];
  constructor(public size: number) {}
  push(fn: AsyncFunction) {
    this.queue.push(fn);
    this.run();
  }
  run() {
    if (this.current < this.size || !this.start) {
      this.start = true;
      this.current++;
      const fn = this.queue.shift()!;
      fn?.()
        .catch(err => {
          console.log(`ERROR: ${err}`);
        })
        .finally(() => {
          if (--this.current === 0) this.start = false;
          this.run();
        });
    }
  }
}

async function main() {
  clear();
  console.log(LOGO);
  console.log(chalk.blue(`正在批处理LeetCode`));
  const queue = new AsyncQueue(100);
  const map = await allQuestions();
  for (const item of travel()) {
    queue.push(() => walk({ map, filepath: item.filepath }));
  }
}
main();
