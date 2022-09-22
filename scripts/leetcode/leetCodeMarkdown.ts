import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1640. 能否连接形成数组',
  url: 'https://leetcode.cn/problems/check-array-formation-through-concatenation/',
  difficulty: Difficulty.中等,
  tag: [Tag.数组, Tag.哈希表],
  desc: `如果可以连接 pieces 中的数组形成 arr ，返回 true ；否则，返回 false 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 4,
      memory: 9,
      desc: '哈希存储',
      code: `class Solution {
public:
    bool canFormArray(vector<int>& arr, vector<vector<int>>& pieces) {
        unordered_map<int, int> m;
        for (int i = 0; i < pieces.size(); i++) m[pieces[i][0]] = i;
        for (int i = 0; i < arr.size();) {
            if (!m.count(arr[i])) return false;
            int idx = m[arr[i]];
            for (int j = 0; j < pieces[idx].size(); j++, i++) if (pieces[idx][j] != arr[i]) return false;
        }
        return true;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
