import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1773. 统计匹配检索规则的物品数量',
  url: 'https://leetcode.cn/problems/count-items-matching-a-rule/',
  difficulty: Difficulty.简单,
  tag: [Tag.数组, Tag.字符串],
  desc: `统计并返回 匹配检索规则的物品数量 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 68,
      memory: 30.2,
      desc: '模拟',
      code: `class Solution {
public:
    int countMatches(vector<vector<string>>& items, string ruleKey, string ruleValue) {
        return accumulate(items.begin(), items.end(), 0, [&](int sum, vector<string> &s){
            int idx = ruleKey == "type" ? 0 : ruleKey == "color" ? 1 : 2;
            if (s[idx] == ruleValue) sum += 1;
            return sum;
        });
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
