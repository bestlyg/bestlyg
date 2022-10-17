import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '904. 水果成篮',
  url: 'https://leetcode.cn/problems/fruit-into-baskets/',
  difficulty: Difficulty.中等,
  tag: [Tag.数组, Tag.哈希表, Tag.滑动窗口],
  desc: `给你一个整数数组 fruits ，返回你可以收集的水果的 最大 数目。`,
  solutions: [
    {
      script: Script.CPP,
      time: 204,
      memory: 69.4,
      desc: '滑动窗口，每次记录窗口中小于3元素时的最大可能',
      code: `class Solution {
public:
    int totalFruit(vector<int>& fruits) {
        unordered_map<int, int> m;
        int ans = 0, l = 0, r = 0, n = fruits.size();
        while (r < n) {
            m[fruits[r]]++;
            if (m.size() == 3) {
                do {
                    m[fruits[l]]--;
                    if (m[fruits[l]] == 0) m.erase(fruits[l]);
                    l++;
                } while (l < n && m.size() == 3);
            }
            ans = max(ans, r - l + 1);
            r++;
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
