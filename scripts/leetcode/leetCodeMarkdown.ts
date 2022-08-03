import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '899. 有序队列',
  url: 'https://leetcode.cn/problems/orderly-queue/',
  difficulty: Difficulty.困难,
  tag: [Tag.数学, Tag.字符串, Tag.排序],
  desc: `给定一个字符串 s 和一个整数 k 。你可以从 s 的前 k 个字母中选择一个，并把它加到字符串的末尾。  `,
  solutions: [
    {
      script: Script.RUST,
      time: 0,
      memory: 2.3,
      desc: '如果k大于1，说明可以任意调换顺序，如果k等于1说明只能把头部放入尾部',
      code: `use std::cmp::Ordering;
use std::collections::VecDeque;
impl Solution {
    pub fn orderly_queue(s: String, k: i32) -> String {
        if k == 1 {
            let mut s = s.chars().collect::<VecDeque<char>>();
            let mut ans = s.clone();
            let mut temp = s.clone();
            for i in 0..s.len() {
                temp.pop_front();
                temp.push_back(s[i]);
                if ans.cmp(&temp) == Ordering::Greater {
                    ans = temp.clone();
                }
            }
            ans.into_iter().collect()
        } else {
            let mut s = s.chars().collect::<Vec<char>>();
            s.sort();
            s.into_iter().collect()
        }
    }
}`,
    },
  ],
};
export default leetCodeMarkdown;
