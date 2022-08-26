import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1464. 数组中两元素的最大乘积',
  url: 'https://leetcode.cn/problems/maximum-product-of-two-elements-in-an-array/',
  difficulty: Difficulty.简单,
  tag: [Tag.数组, Tag.排序, Tag.堆_优先队列],
  desc: `给你一个整数数组 nums，请你选择数组的两个不同下标 i 和 j，使 (nums[i]-1)*(nums[j]-1) 取得最大值。`,
  solutions: [
    {
      script: Script.RUST,
      time: 0,
      memory: 2,
      desc: '排序',
      code: `impl Solution {
    pub fn max_product(nums: Vec<i32>) -> i32 {
        let mut nums = nums;
        nums.sort();
        (nums[nums.len() - 1] - 1) * (nums[nums.len() - 2] - 1)
    }
}`,
    },
    {
      script: Script.RUST,
      time: 0,
      memory: 2,
      desc: '遍历',
      code: `impl Solution {
    pub fn max_product(nums: Vec<i32>) -> i32 {
        let (mut num1, mut num2) = (nums[0], nums[1]);
        if num2 > num1 {
            num1 ^= num2;
            num2 ^= num1;
            num1 ^= num2;
        }
        let mut i = 2;
        while i < nums.len() {
            if nums[i] > num1 {
                num2 = num1;
                num1 = nums[i];
            } else if nums[i] > num2 {
                num2 = nums[i];
            }
            i += 1;
        }
        (num1 - 1) * (num2 - 1)
    }
}`,
    },
  ],
};
export default leetCodeMarkdown;
