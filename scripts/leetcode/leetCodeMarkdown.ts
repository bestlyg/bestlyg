import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '553. 最优除法',
  url: 'https://leetcode-cn.com/problems/optimal-division/',
  difficulty: Difficulty.中等,
  tag: [Tag.数组, Tag.数学, Tag.动态规划],
  desc: `给定一组正整数，相邻的整数之间将会进行浮点除法操作。例如， [2,3,4] -> 2 / 3 / 4 。但是，你可以在任意位置添加任意数目的括号，来改变算数的优先级。你需要找出怎么添加括号，才能得到最大的结果，并且返回相应的字符串格式的表达式。你的表达式不应该含有冗余的括号。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 7.7,
      desc: '使分母最小',
      code: `class Solution {
   public:
    string optimalDivision(vector<int>& nums) {
        int n = nums.size();
        if (n == 1) return to_string(nums[0]);
        if (n == 2) return to_string(nums[0]) + "/" + to_string(nums[1]);
        string ans = to_string(nums[0]) + "/(";
        for (int i = 1; i < nums.size(); i++) {
            ans += to_string(nums[i]);
            if (i != nums.size() - 1) ans += "/";
        }
        ans += ")";
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
