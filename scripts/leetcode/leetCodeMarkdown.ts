import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '241. 为运算表达式设计优先级',
  url: 'https://leetcode.cn/problems/wiggle-sort-ii/',
  difficulty: Difficulty.中等,
  tag: [Tag.数组, Tag.哈希表, Tag.双指针, Tag.字符串, Tag.排序],
  desc: `给你一个整数数组 nums，将它重新排列成 nums[0] < nums[1] > nums[2] < nums[3]... 的顺序。`,
  solutions: [
    {
      script: Script.CPP,
      time: 8,
      memory: 12.4,
      desc: '分治',
      code: `class Solution {
   public:
    unordered_set<char> opset;
    Solution() {
        opset.insert('+');
        opset.insert('-');
        opset.insert('*');
    }
    vector<int> diffWaysToCompute(string expression) {
        vector<int> ans, oplist;
        int n = expression.size();
        for (int i = 0; i < n; i++) {
            if (opset.count(expression[i])) oplist.push_back(i);
        }
        if (oplist.size() == 0)
            ans.push_back(toNum(expression));
        else
            dfs(expression, oplist, ans);
        return ans;
    }
    int toNum(string &expression) {
        int num = 0, n = expression.size(), i = 0;
        while (i < n && !opset.count(expression[i]))
            num = num * 10 + expression[i++] - '0';
        return num;
    }
    void dfs(string &expression, vector<int> &oplist, vector<int> &ans) {
        for (auto &idx : oplist) {
            vector<int> llist = diffWaysToCompute(expression.substr(0, idx));
            vector<int> rlist = diffWaysToCompute(
                expression.substr(idx + 1, expression.size() - idx));
            for (auto &num1 : llist) {
                for (auto &num2 : rlist) {
                    switch (expression[idx]) {
                        case '+':
                            ans.push_back(num1 + num2);
                            break;
                        case '-':
                            ans.push_back(num1 - num2);
                            break;
                        case '*':
                            ans.push_back(num1 * num2);
                            break;
                    }
                }
            }
        }
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
