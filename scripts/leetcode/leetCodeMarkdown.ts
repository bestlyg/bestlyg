import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '1760. 袋子里最少数目的球',
  url: 'https://leetcode.cn/problems/find-if-path-exists-in-graph/',
  difficulty: Difficulty.简单,
  tag: [Tag.深度优先搜索, Tag.广度优先搜索, Tag.并查集, Tag.图],
  desc: `请你确定是否存在从顶点 source 开始，到顶点 destination 结束的 有效路径 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 164,
      memory: 54.7,
      desc: '二分查找',
      code: `class Solution {
public:
    int minimumSize(vector<int>& nums, int maxOperations) {
        int nmin = 1, nmax = 1000000000, nmid;
        while (nmin < nmax) {
            nmid = (nmin + nmax) / 2;
            if (comp(nums, nmid) <= maxOperations) nmax = nmid;
            else nmin = nmid + 1;
        }
        return nmin;
    }
    int comp(vector<int> &nums, int val) {
        int ans = 0;
        for (auto &num : nums) {
            if (num <= val) continue;
            ans += ceil(1.0 * num / val) - 1;
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
