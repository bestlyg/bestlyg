import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1033. 移动石子直到连续',
  url: 'https://leetcode.cn/problems/moving-stones-until-consecutive/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `三枚石子放置在数轴上，位置分别为 a，b，c。使游戏结束，你可以执行的最小和最大移动次数分别是多少？`,
  solutions: [
    //     {
    //       script: Script.TS,
    //       time: 76,
    //       memory: 45.9,
    //       desc: '遍历',
    //       code: `function sortPeople(names: string[], heights: number[]): string[] {
    //   return new Array(names.length)
    //     .fill(0)
    //     .map((_, i) => i)
    //     .sort((a, b) => heights[b] - heights[a])
    //     .map(i => names[i]);
    // }`,
    //       date: new Date('2022/09/25').getTime(),
    //     },
    {
      script: Script.CPP,
      time: 0,
      memory: 6.1,
      desc: '贪心，先排序，最大数就是ac一步步往b靠，最小数是如果有两个数紧挨或者两个数中间空一格，那就可以一步到位，否则需要两步',
      code: `void sort3(int &a, int &b, int &c) {
    if (a > c) swap(a, c);
    if (a > b) swap(a, b);
    if (b > c) swap(b, c);
}
class Solution {
public:
    vector<int> numMovesStones(int a, int b, int c) {
        sort3(a, b, c);
        vector<int> res(2, 0);
        if (a + 2 == c) return res;
        res[0] = a + 1 == b || b + 1 == c || a + 2 == b || b + 2 == c ? 1 : 2;
        res[1] = c - b - 1 + b - a - 1;
        return res;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 36,
      memory: 16.1,
      desc: '同上',
      code: `def sort3(a: int, b: int, c: int) -> Tuple[int, int, int]:
    if a > c:
        a, c = c, a
    if a > b:
        a, b = b, a
    if b > c:
        b, c = c, b
    return (a, b, c)


class Solution:
    def numMovesStones(self, a: int, b: int, c: int) -> List[int]:
        a, b, c = sort3(a, b, c)
        if a + 2 == c:
            return [0, 0]
        return [
            1 if a + 1 == b or b + 1 == c or a + 2 == b or b + 2 == c else 2,
            c - b - 1 + b - a - 1
        ]`,
    },
    {
      script: Script.RUST,
      time: 0,
      memory: 1.9,
      desc: '同上',
      code: `fn sort3(a: &mut i32, b: &mut i32, c: &mut i32) {
    use std::ptr::swap;
    unsafe {
        if a > c {
            swap(a, c);
        }
        if a > b {
            swap(a, b);
        }
        if b > c {
            swap(b, c);
        }
    };
}

impl Solution {
    pub fn num_moves_stones(mut a: i32, mut b: i32, mut c: i32) -> Vec<i32> {
        sort3(&mut a, &mut b, &mut c);
        if a + 2 == c {
            vec![0, 0]
        } else {
            vec![
                if a + 1 == b || b + 1 == c || a + 2 == b || b + 2 == c {
                    1
                } else {
                    2
                },
                c - b - 1 + b - a - 1,
            ]
        }
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
