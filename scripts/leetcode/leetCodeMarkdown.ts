import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '1447. 最简分数',
  url: 'https://leetcode-cn.com/problems/count-number-of-pairs-with-absolute-difference-k/',
  difficulty: Difficulty.简单,
  tag: [Tag.数组, Tag.哈希表, Tag.计数],
  desc: `给你一个整数数组 nums 和一个整数 k ，请你返回数对 (i, j) 的数目，满足 i < j 且 |nums[i] - nums[j]| == k 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 116,
      memory: 32.5,
      desc: '判断最大公约数',
      code: `class Solution {
   public:
    vector<string> simplifiedFractions(int n) {
        unordered_set<string> s;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j < i; j++) {
                int num = gcd(i, j);
                s.insert(to_string(j / num) + "/" + to_string(i / num));
            }
        }
        vector<string> ans;
        for (auto& str : s) ans.push_back(str);
        return ans;
    }
};`,
    },
    {
      script: Script.CPP,
      time: 48,
      memory: 21.3,
      desc: '判断最大公约数',
      code: `class Solution {
   public:
    vector<string> simplifiedFractions(int n) {
        vector<string> ans;
        for (int i = 2; i <= n; i++) {
            for (int j = 1; j < i; j++) {
                if (j == 1 || gcd(i, j) == 1)
                    ans.push_back(to_string(j) + "/" + to_string(i));
            }
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
