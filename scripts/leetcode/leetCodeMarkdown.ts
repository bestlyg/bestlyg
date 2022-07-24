import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '1184. 公交站间的距离',
  url: 'https://leetcode.cn/problems/ur2n8P/',
  difficulty: Difficulty.中等,
  tag: [Tag.图, Tag.拓扑排序, Tag.数组],
  desc: `检查 nums 是否是唯一的最短 超序列 。`,
  solutions: [
    {
      script: Script.RUST,
      time: 0,
      memory: 2.1,
      desc: '遍历',
      code: `impl Solution {
    pub fn distance_between_bus_stops(distance: Vec<i32>, start: i32, destination: i32) -> i32 {
        let n = distance.len() as i32;
        let (mut sum1, mut sum2) = (0, 0);
        let (mut cur1, mut cur2) = (start, destination);
        let mut i = start;
        while i != destination {
            sum1 += distance[i as usize];
            i = (i + 1) % n;
        }
        i = destination;
        while i != start {
            sum2 += distance[i as usize];
            i = (i + 1) % n;
        }
        sum1.min(sum2)
    }
}`,
    },
  ],
};
export default leetCodeMarkdown;
