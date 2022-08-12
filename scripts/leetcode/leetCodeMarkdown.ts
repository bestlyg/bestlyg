import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1282. 用户分组',
  url: 'https://leetcode.cn/problems/group-the-people-given-the-group-size-they-belong-to/',
  difficulty: Difficulty.中等,
  tag: [Tag.数组, Tag.哈希表],
  desc: `返回一个组列表，使每个人 i 都在一个大小为 groupSizes[i] 的组中。`,
  solutions: [
    {
      script: Script.RUST,
      time: 4,
      memory: 2.3,
      desc: 'map重组',
      code: `use std::collections::*;
impl Solution {
    pub fn group_the_people(group_sizes: Vec<i32>) -> Vec<Vec<i32>> {
        let mut ans = Vec::new();
        let mut map = HashMap::<i32, Vec<Vec<i32>>>::new();
        for i in 0..group_sizes.len() {
            let k = group_sizes[i];
            let list = map.entry(k).or_insert(vec![vec![]]);
            let item = list.last_mut().unwrap();
            item.push(i as i32);
            if item.len() == k as usize {
                ans.push(item.clone());
                list.push(Vec::new());
            }
        }
        ans
    }
}`,
    },
  ],
};
export default leetCodeMarkdown;
