import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '498. 对角线遍历',
  url: 'https://leetcode.cn/problems/diagonal-traverse/',
  difficulty: Difficulty.中等,
  tag: [Tag.数组, Tag.矩阵, Tag.模拟],
  desc: `给你一个大小为 m x n 的矩阵 mat ，请以对角线遍历的顺序，用一个数组返回这个矩阵中的所有元素。`,
  solutions: [
    {
      script: Script.CPP,
      time: 24,
      memory: 17.9,
      desc: '遍历，内嵌两个while进行反复循环',
      code: `class Solution {
   public:
    vector<int> findDiagonalOrder(vector<vector<int>>& mat) {
        int n = mat.size(), m = mat[0].size(), i = 0, j = 0;
        vector<int> ans;
        while (i != n - 1 || j != m - 1) {
            while (i != -1 && j != m) ans.push_back(mat[i--][j++]);
            i++;
            if (j == m) j--, i++;
            if (i == n - 1 && j == m - 1) break;
            while (i != n && j != -1) ans.push_back(mat[i++][j--]);
            j++;
            if (i == n) i--, j++;
            if (i == n - 1 && j == m - 1) break;
        }
        ans.push_back(mat[i][j]);
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
