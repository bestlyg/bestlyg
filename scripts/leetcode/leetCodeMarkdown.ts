import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1460. 通过翻转子数组使两个数组相等',
  url: 'https://leetcode.cn/problems/make-two-arrays-equal-by-reversing-sub-arrays/',
  difficulty: Difficulty.简单,
  tag: [Tag.数组, Tag.哈希表, Tag.排序],
  desc: `给你两个长度相同的整数数组 target 和 arr 。每一步中，你可以选择 arr 的任意 非空子数组 并将它翻转。你可以执行此过程任意次。`,
  solutions: [
    {
      script: Script.CPP,
      time: 12,
      memory: 13.9,
      desc: '只要数的数量相同就可以匹配',
      code: `class Solution {
public:
    bool canBeEqual(vector<int>& target, vector<int>& arr) {
       int map[1005] = {0};
       for (auto &num : arr) map[num]++;
       for (auto &num : target) {
           if (map[num]-- == 0) return false;
       } 
       return true;
    }
};`,
    },
    {
      script: Script.RUST,
      time: 0,
      memory: 2,
      desc: '只要数的数量相同就可以匹配',
      code: `impl Solution {
    pub fn can_be_equal(target: Vec<i32>, arr: Vec<i32>) -> bool {
        let mut map = [0; 1005];
        for num in arr {
            map[num as usize] += 1;
        }
        for num in target {
            if map[num as usize] == 0 {
                return false;
            }
            map[num as usize] -= 1;
        }
        true
    }
}`,
    },
  ],
};
export default leetCodeMarkdown;
