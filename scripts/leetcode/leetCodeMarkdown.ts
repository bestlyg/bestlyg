import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1636. 按照频率将数组升序排序',
  url: 'https://leetcode.cn/problems/sort-array-by-increasing-frequency/',
  difficulty: Difficulty.简单,
  tag: [Tag.数组, Tag.哈希表, Tag.排序],
  desc: `给你一个整数数组 nums ，请你将数组按照每个值的频率 升序 排序。如果有多个值的频率相同，请你按照数值本身将它们 降序 排序。 `,
  solutions: [
    {
      script: Script.CPP,
      time: 4,
      memory: 10.9,
      desc: '用哈希表存储后排序',
      code: `class Solution {
public:
    typedef pair<int, int> node;
    vector<int> frequencySort(vector<int>& nums) {
        unordered_map<int, int> m;
        for (auto &num : nums) m[num]++;
        vector<node> list;
        for (auto &item : m) list.push_back(item);
        sort(list.begin(), list.end(), [&](const node a, const node b) -> bool {
            return a.second == b.second ? b.first < a.first : a.second < b.second;
        });
        vector<int> ans;
        ans.reserve(nums.size());
        for (auto &item : list) for (int i = 0; i < item.second; i++) ans.push_back(item.first);
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
