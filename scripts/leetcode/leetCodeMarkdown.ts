import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '905. 按奇偶排序数组',
  url: 'https://leetcode-cn.com/problems/pacific-atlantic-water-flow/',
  difficulty: Difficulty.中等,
  tag: [Tag.深度优先搜索, Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `返回 网格坐标 result 的 2D列表 ，其中 result[i] = [ri, ci] 表示雨水可以从单元格 (ri, ci) 流向 太平洋和大西洋 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 4,
      memory: 4.6,
      desc: '双指针',
      code: `func sortArrayByParity(nums []int) []int {
    var i1, i2 = 0, len(nums) - 1
    for i1 < i2 {
        for i1 < i2 && nums[i1]&1 == 0 {
            i1 += 1
        }
        for i1 < i2 && nums[i2]&1 == 1 {
            i2 -= 1
        }
        nums[i1], nums[i2] = nums[i2], nums[i1]
    }
    return nums
}`,
    },
  ],
};
export default leetCodeMarkdown;
