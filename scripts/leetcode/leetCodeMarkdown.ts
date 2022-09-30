import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '面试题 01.08. 零矩阵',
  url: 'https://leetcode.cn/problems/zero-matrix-lcci/',
  difficulty: Difficulty.中等,
  tag: [Tag.数组, Tag.哈希表, Tag.矩阵],
  desc: `编写一种算法，若M × N矩阵中某个元素为0，则将其所在的行与列清零。`,
  solutions: [
    {
      script: Script.CPP,
      time: 12,
      memory: 11.9,
      desc: '遍历',
      code: `class Solution {
public:
    void setZeroes(vector<vector<int>>& matrix) {
        int n = matrix.size(), m = matrix[0].size();
        unordered_set<int> rows, cols;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (matrix[i][j] == 0) {
                    rows.insert(i);
                    cols.insert(j);
                }
            }
        }
        for (auto &row : rows) {
            for (int i = 0; i < m; i++) matrix[row][i] = 0;
        }
        for (auto &col : cols) {
            for (int i = 0; i < n; i++) matrix[i][col] = 0;
        }
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
