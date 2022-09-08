import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '667. 优美的排列 II',
  url: 'https://leetcode.cn/problems/beautiful-arrangement-ii/',
  difficulty: Difficulty.中等,
  tag: [Tag.数组, Tag.数学],
  desc: `给你两个整数 n 和 k ，请你构造一个答案列表 answer ，该列表应当包含从 1 到 n 的 n 个不同正整数。`,
  solutions: [
    {
      script: Script.CPP,
      time: 28,
      memory: 8.9,
      desc: '[1, k+1, 2, k, 3, k-1..]排列',
      code: `int* constructArray(int n, int k, int* returnSize){
    *returnSize = n;
    int *ans = (int *)malloc(sizeof(int) * n);
    if (k == 1) for (int i = 0; i < n; i++) ans[i] = i + 1;
    else {
        int l = 1, r = k + 1, idx = 0;
        while (l < r) {
            ans[idx++] = l++;
            if (l != r) ans[idx++] = r--;
        }
        if (l == r) ans[id++] = l;
        k += 2;
        while (k <= n) ans[idx++] = k++;
    }
    return ans;
}`,
    },
  ],
};
export default leetCodeMarkdown;
