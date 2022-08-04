import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1403. 非递增顺序的最小子序列',
  url: 'https://leetcode.cn/problems/minimum-subsequence-in-non-increasing-order/',
  difficulty: Difficulty.简单,
  tag: [Tag.贪心, Tag.数组, Tag.排序],
  desc: `和 严格 大于未包含在该子序列中的各元素之和。`,
  solutions: [
    {
      script: Script.RUST,
      time: 0,
      memory: 2.1,
      desc: '排序后，从后往前取值',
      code: `impl Solution {
    pub fn min_subsequence(nums: Vec<i32>) -> Vec<i32> {
        let mut nums = nums;
        nums.sort();
        let sum: i32 = nums.iter().sum();
        let mut cur = 0;
        let mut i = nums.len() - 1;
        let mut ans = Vec::new();
        while cur * 2 <= sum {
            cur += nums[i];
            ans.push(nums[i]);
            i -= 1;
        }
        ans
    }
}`,
    },
  ],
};
export default leetCodeMarkdown;
