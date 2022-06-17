import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '1089. 复写零',
  url: 'https://leetcode.cn/problems/duplicate-zeros/',
  difficulty: Difficulty.中等,
  tag: [Tag.数组, Tag.哈希表, Tag.双指针, Tag.二分查找, Tag.排序],
  desc: `给你一个整数数组 nums 和一个整数 k，请你在数组中找出 不同的 k-diff 数对，并返回不同的 k-diff 数对 的数目。`,
  solutions: [
    {
      script: Script.CPP,
      time: 4,
      memory:9.3,
      desc: '从后往前遍历',
      code: `class Solution {
   public:
    void duplicateZeros(vector<int>& arr) {
        int n = arr.size(), p = n - 1;
        auto setNum = [&](int i, int p) -> void {
            if (p < n) arr[p] = arr[i];
        };
        for (int i = 0; i < n; i++) {
            if (arr[i] == 0) p++;
        }
        for (int i = n - 1; i >= 0; i--, p--) {
            if (arr[i] == 0) {
                setNum(i, p--);
                setNum(i, p);
            } else {
                setNum(i, p);
            }
        }
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
