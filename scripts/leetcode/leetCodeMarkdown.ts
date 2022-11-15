import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1710. 卡车上的最大单元数',
  url: 'https://leetcode.cn/problems/maximum-units-on-a-truck/',
  difficulty: Difficulty.简单,
  tag: [Tag.贪心, Tag.数组, Tag.排序],
  desc: `返回卡车可以装载 单元 的 最大 总数。`,
  solutions: [
    {
      script: Script.CPP,
      time: 44,
      memory: 15.6,
      desc: '排序后遍历',
      code: `class Solution {
public:
    int maximumUnits(vector<vector<int>>& boxTypes, int truckSize) {
        sort(boxTypes.begin(), boxTypes.end(), [](auto &a, auto &b){ return a[1] > b[1]; });
        int ans = 0, cur = 0;
        while (truckSize && cur < boxTypes.size()) {
            if (boxTypes[cur][0] >= truckSize) {
                ans += truckSize * boxTypes[cur][1];
                truckSize = 0;
            } else {
                truckSize -= boxTypes[cur][0];
                ans += boxTypes[cur][0] * boxTypes[cur][1];
            }
            cur++;
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
