import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1470. 重新排列数组',
  url: 'https://leetcode.cn/problems/shuffle-the-array/',
  difficulty: Difficulty.简单,
  tag: [Tag.数组],
  desc: `请你将数组按 [x1,y1,x2,y2,...,xn,yn] 格式重新排列，返回重排后的数组。`,
  solutions: [
    {
      script: Script.CPP,
      time: 12,
      memory: 6.9,
      desc: '层序遍历',
      code: `int* shuffle(int* nums, int numsSize, int n, int* returnSize){
     int *ans = (int *)malloc(sizeof(int) * n * 2);
    for (int i = 0, j = n, idx = 0; idx < n * 2; i++, j++) {
        ans[idx++] = nums[i];
        ans[idx++] = nums[j];
    }
    *returnSize = 2 * n;
    return ans;
}`,
    },
  ],
};
export default leetCodeMarkdown;
