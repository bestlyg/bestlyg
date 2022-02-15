import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1380. 矩阵中的幸运数',
  url: 'https://leetcode-cn.com/problems/lucky-numbers-in-a-matrix/',
  difficulty: Difficulty.简单,
  tag: [Tag.数组, Tag.矩阵],
  desc: `给你一个 m * n 的矩阵，矩阵中的数字 各不相同 。请你按 任意 顺序返回矩阵中的所有幸运数。`,
  solutions: [
    {
      script: Script.CPP,
      time: 20,
      memory: 10.9,
      desc: '遍历后记录每行最小值和每列最大值，如果第i行最小为j且第j列最大位i，即可成立',
      code: `class Solution {
   public:
    int rows[50] = {0}, cols[50] = {0};
    vector<int> luckyNumbers(vector<vector<int>>& matrix) {
        int n = matrix.size(), m = matrix[0].size();
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (matrix[i][j] < matrix[i][rows[i]]) rows[i] = j;
                if (matrix[i][j] > matrix[cols[j]][j]) cols[j] = i;
            }
        }
        vector<int> ans;
        for (int i = 0; i < n; i++) {
            if (i == cols[rows[i]]) ans.push_back(matrix[i][rows[i]]);
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
