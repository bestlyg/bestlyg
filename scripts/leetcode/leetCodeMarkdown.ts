import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1413. 逐步求和得到正数的最小值',
  url: 'https://leetcode.cn/problems/minimum-value-to-get-positive-step-by-step-sum/',
  difficulty: Difficulty.困难,
  tag: [Tag.数组, Tag.前缀和],
  desc: `请你在确保累加和始终大于等于 1 的前提下，选出一个最小的 正数 作为 startValue 。`,
  solutions: [
    {
      script: Script.RUST,
      time: 0,
      memory: 2.2,
      desc: '前缀和判断每一次数组中值相加的绝对值小于ans',
      code: `impl Solution {
    pub fn min_start_value(nums: Vec<i32>) -> i32 {
        let mut ans = 1;
        let mut sum  = 0;
        for num in nums {
            sum += num;
            if sum < 0 && ans <= sum.abs() {
                ans = sum.abs() + 1;
            }
        }
        ans
    }
}`,
    },
    {
      script: Script.RUST,
      time: 0,
      memory: 2,
      desc: '前缀和判断每一次数组中值相加的绝对值小于ans',
      code: `impl Solution {
    pub fn min_start_value(nums: Vec<i32>) -> i32 {
        let (mut ans, mut sum) = (0, 0);
        for num in nums {
            sum += num;
            ans = ans.min(sum);
        }
        ans.abs() + 1
    }
}`,
    },
    {
      script: Script.RUST,
      time: 0,
      memory: 2,
      desc: '二分',
      code: `
fn check(nums: &Vec<i32>, v: i32) -> bool {
    let mut v = v;
    for num in nums {
        v += num;
        if v <= 0 {
            return false;
        }
    }
    true
}

impl Solution {
    pub fn min_start_value(nums: Vec<i32>) -> i32 {
        let (mut l, mut r) = (1, i32::MAX);
        while l < r {
            let m = l + (r - l) / 2;
            if check(&nums, m) {
                r = m;
            } else {
                l = m + 1;
            }
        }
        l
    }
}`,
    },
  ],
};
export default leetCodeMarkdown;
