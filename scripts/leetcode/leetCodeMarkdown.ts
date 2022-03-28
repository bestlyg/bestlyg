import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1089. 复写零',
  url: 'https://leetcode-cn.com/problems/duplicate-zeros/',
  difficulty: Difficulty.简单,
  tag: [Tag.数组, Tag.双指针],
  desc: `给你一个长度固定的整数数组 arr，请你将该数组中出现的每个零都复写一遍，并将其余的元素向右平移。`,
  solutions: [
    {
      script: Script.CPP,
      time: 76,
      memory: 43.9,
      desc: '统计0的下标',
      code: `function duplicateZeros(arr: number[]): void {
        const list = new Array(arr.length)
          .fill(0)
          .map((_, i) => i)
          .filter(v => arr[v] === 0)
          .reverse();
        for (const idx of list) {
          arr.splice(idx, 0, 0);
          arr.pop();
        }
      }`,
    },
  ],
};
export default leetCodeMarkdown;
