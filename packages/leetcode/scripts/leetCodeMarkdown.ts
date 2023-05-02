import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '970. 强整数',
  url: 'https://leetcode.cn/problems/powerful-integers/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `给定三个整数 x 、 y 和 bound ，返回 值小于或等于 bound 的所有 强整数 组成的列表 。`,
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
      memory: 6.6,
      desc: 'dfs',
      code: `class Solution {
public:
    vector<int> powerfulIntegers(int x, int y, int bound) {
        vector<int> list;
        unordered_set<int> res;
        for (int i = 0; pow(x, i) <= bound; i++) {
            list.push_back(pow(x, i));
            if (x == 1) break;
        }
        for (int i = 0; pow(y, i) <= bound; i++) {
            int ynum = pow(y, i);
            for (auto &xnum : list)
                if (ynum + xnum <= bound) res.insert(ynum + xnum);
                else break;
            if (y == 1) break;
        }
        return vector<int>(res.begin(), res.end());
    }
};`,
    },
    {
      script: Script.PY3,
      time: 48,
      memory: 16.2,
      desc: '同上',
      code: `class Solution:
    def powerfulIntegers(self, x: int, y: int, bound: int) -> List[int]:
        list = []
        res = set()
        i = 0
        while pow(x, i) <= bound:
            list.append(pow(x, i))
            if x == 1:
                break
            i += 1
        i = 0
        while pow(y, i) <= bound:
            ynum = pow(y, i)
            for xnum in list:
                if ynum + xnum <= bound:
                    res.add(ynum + xnum)
                else:
                    break
            if y == 1:
                break
            i += 1
        return [num for num in res]`,
    },
    {
      script: Script.RUST,
      time: 4,
      memory: 2.2,
      desc: '同上',
      code: `impl Solution {
    pub fn powerful_integers(x: i32, y: i32, bound: i32) -> Vec<i32> {
        let mut list = vec![];
        let mut res = std::collections::HashSet::<i32>::new();
        let mut i = 0;
        while x.pow(i) <= bound {
            list.push(x.pow(i));
            if x == 1 {
                break;
            }
            i += 1;
        }
        i = 0;
        while y.pow(i) <= bound {
            let ynum = y.pow(i);
            for xnum in &list {
                if ynum + *xnum <= bound {
                    res.insert(ynum + *xnum);
                } else {
                    break;
                }
            }
            if y == 1 {
                break;
            }
            i += 1;
        }
        res.into_iter().collect()
    }
}
`,
    },
  ],
};

export default leetCodeMarkdown;
