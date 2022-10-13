import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '769. 最多能完成排序的块',
  url: 'https://leetcode.cn/problems/max-chunks-to-make-sorted/',
  difficulty: Difficulty.中等,
  tag: [Tag.栈, Tag.贪心, Tag.数组,Tag.排序,Tag.单调栈],
  desc: `返回数组能分成的最多块数量。`,
  solutions: [
    {
      script: Script.CPP,
      time: 4,
      memory: 7,
      desc: '遍历',
      code: `class Solution {
public:
    int maxChunksToSorted(vector<int>& arr) {
        int n = arr.size(), nmax = arr[0], ans = 0;
        for (int i = 0; i < n; i++) {
            nmax = max(nmax, arr[i]);
            if (nmax == i) ans++;
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
