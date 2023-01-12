import path from 'path';
import fs from 'fs-extra';
import { Type, typeList } from './base';

export const LOGO = `***********************************************************
*      ____  ______  _____ _______ _  __     _______      *
*     |  _ \\|  ____|/ ____|__   __| | \\ \\   / / ____|     *
*     | |_) | |__  | (___    | |  | |  \\ \\_/ / |  __      *
*     |  _ <|  __|  \\___ \\   | |  | |   \\   /| | |_ |     *
*     | |_) | |____ ____) |  | |  | |____| | | |__| |     *
*     |____/|______|_____/   |_|  |______|_|  \\_____|     *
*                                                         *
***********************************************************`;

export const resolve = (...p: string[]) => path.resolve(__dirname, '../', ...p);

export const trimBlank = (str: string) => str.replace(/ /g, '');

export const rootPath = resolve('data');
export interface SolutionList {
  name: string;
  solutions: string[];
}
export const reg = {
  index: new RegExp(`# (.*)`),
  tag: new RegExp('标签：(.*)  '),
  dif: new RegExp('难度：(.*)  '),
  solution: new RegExp('## 题解 (.*) - ', 'g'),
};
export function analysisFileName(name: string) {
  name = trimBlank(name);
  const res = {
    dirname: '',
    dirorder: 0,
    fileorder: 0,
    type: Type.NUMBER,
  };
  for (const { prefix, order, type } of typeList) {
    if (name.startsWith(prefix)) {
      res.type = type;
      res.dirname = prefix;
      res.dirorder = order;
      res.fileorder = parseFloat(name.substring(prefix.length));
      break;
    }
  }
  if (!res.dirname) {
    const num = ~~((parseFloat(name) - 1) / 100);
    res.dirname = `${num * 100 + 1}-${100 * num + 100}`;
    res.dirorder = parseFloat(res.dirname);
    res.fileorder = parseFloat(name);
  }
  return res;
}
export function findLastSolutionIdx(file: string) {
  const matchList = file.matchAll(reg.solution);
  let lastIndex = 0;
  for (const match of matchList) lastIndex = parseInt(match[1]);
  return lastIndex;
}

export function travel() {
  const dirList = fs
    .readdirSync(rootPath)
    .filter(v => !v.includes('.'))
    .sort((name1, name2) => {
      const order1 = typeList.find(v => v.prefix === name1)?.order ?? parseFloat(name1);
      const order2 = typeList.find(v => v.prefix === name2)?.order ?? parseFloat(name2);
      return order1 - order2;
    });
  const ans: { filepath: string }[] = [];
  for (const dir of dirList) {
    const dirPath = `${rootPath}/${dir}`;
    const list = fs.readdirSync(dirPath).sort((name1, name2) => {
      let len = 0;
      for (const { prefix } of typeList) {
        if (name1.startsWith(prefix) && name2.startsWith(prefix)) {
          len = prefix.length;
          break;
        }
      }
      return parseFloat(name1.substring(len)) - parseFloat(name2.substring(len));
    });
    for (const file of list) {
      const filepath = `${dirPath}/${file}`;
      ans.push({ filepath });
    }
  }
  return ans;
}

export const backquote = '`';
