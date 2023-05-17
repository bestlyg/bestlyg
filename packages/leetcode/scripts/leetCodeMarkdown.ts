import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '2446. 判断两个事件是否存在冲突',
  url: 'https://leetcode.cn/problems/chunk-array/',
  difficulty: Difficulty.简单,
  tag: [],
  desc: `给定一个数组 arr 和一个块大小 size ，返回一个 分块 的数组。分块 的数组包含了 arr 中的原始元素，但是每个子数组的长度都是 size 。如果 arr.length 不能被 size 整除，那么最后一个子数组的长度可能小于 size 。`,
  solutions: [
//         {
//           script: Script.TS,
//           time: 76,
//           memory:45.5,
//           desc: '利用余数为0判断是否产生分割',
//           code: `function chunk(arr: any[], size: number): any[][] {
//     const res: any[][] = [];
//     const item: any[] = [];
//     for (let i = 1; i <= arr.length; i++) {
//         item.push(arr[i - 1]);
//         if (i % size === 0) res.push([...item]), (item.length = 0);
//     }
//     if (item.length) res.push([...item]);
//     return res;
// }`,
//         },
    {
      script: Script.CPP,
      time: 0,
      memory:11.1,
      desc: '转换成数字后比大小',
      code: `class Solution {
public:
    bool haveConflict(vector<string>& event1, vector<string>& event2) {
        auto to_time = [&](string t) -> int {
            return ((t[0] - '0') * 10 + t[1] - '0') * 60 + (t[3] - '0') * 10 + t[4] - '0';
        };
        int s1 = to_time(event1[0]), e1 = to_time(event1[1]),
            s2 = to_time(event2[0]), e2 = to_time(event2[1]);
        if (s1 > s2) swap(s1, s2), swap(e1, e2);
        return e1 >= s2;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 36,
      memory: 16.1,
      desc: '同上',
      code: `class Solution:
    def haveConflict(self, event1: List[str], event2: List[str]) -> bool:
        def to_time(t: str):
            return int(t[:2]) * 60 + int(t[3:])
        s1, e1 = to_time(event1[0]), to_time(event1[1])
        s2, e2 = to_time(event2[0]), to_time(event2[1])
        if s1 > s2:
            s1, e1, s2, e2 = s2, e2, s1, e1
        return e1 >= s2`,
    },
    {
      script: Script.RUST,
      time: 0,
      memory: 2,
      desc: '同上',
      code: `impl Solution {
    pub fn have_conflict(event1: Vec<String>, event2: Vec<String>) -> bool {
        let to_time =
            |s: &String| -> i32 { s[0..2].parse::<i32>().unwrap() * 60 + s[3..].parse::<i32>().unwrap() };
        let (mut s1, mut e1, mut s2, mut e2) = (
            to_time(&event1[0]),
            to_time(&event1[1]),
            to_time(&event2[0]),
            to_time(&event2[1]),
        );
        if s1 > s2 {
            unsafe {
                std::ptr::swap(&mut s1, &mut s2);
                std::ptr::swap(&mut e1, &mut e2);
            }
        }
        e1 >= s2
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
