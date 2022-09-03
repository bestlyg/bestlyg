import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '646. 最长数对链',
  url: 'https://leetcode.cn/problems/maximum-length-of-pair-chain/',
  difficulty: Difficulty.中等,
  tag: [Tag.贪心, Tag.数组, Tag.动态规划, Tag.排序],
  desc: `给定一个数对集合，找出能够形成的最长数对链的长度。你不需要用到所有的数对，你可以以任何顺序选择其中的一些数对来构造。`,
  solutions: [
    {
      script: Script.CPP,
      time: 32,
      memory: 2.2,
      desc: 'dp记录当前点为结尾的最大链路',
      code: `impl Solution {
    pub fn find_longest_chain(pairs: Vec<Vec<i32>>) -> i32 {
        let mut pairs = pairs;
        pairs.sort_by(|a, b| {
            if a[0] != b[0] {
                a[0].cmp(&b[0])
            } else {
                a[1].cmp(&b[1])
            }
        });
        let len = pairs.len();
        let mut dp = vec![1; len];
        let mut ans = 0;
        for i in 0..len {
            for j in 0..i {
                if pairs[j][1] < pairs[i][0] {
                    dp[i] = dp[i].max(dp[j] + 1)
                }
            }
            ans = ans.max(dp[i]);
        }
        ans
    }
}`,
    },
  ],
};
export default leetCodeMarkdown;
