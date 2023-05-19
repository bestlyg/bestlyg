import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1079. 活字印刷',
  url: 'https://leetcode.cn/problems/letter-tile-possibilities/',
  difficulty: Difficulty.简单,
  tag: [],
  desc: `你有一套活字字模 tiles，其中每个字模上都刻有一个字母 tiles[i]。返回你可以印出的非空字母序列的数目。`,
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
      time: 144,
      memory: 22.7,
      desc: '全排列',
      code: `class Solution {
public:
    int numTilePossibilities(string tiles) {
        unordered_set<string> s;
        unordered_set<int> idxs;
        function<void(string)> dfs = [&](string cur) {
            s.insert(cur);
            if (cur.size() == tiles.size()) return;
            for (int i = 0; i < tiles.size(); i++) {
                if (idxs.count(i)) continue;
                idxs.insert(i);
                dfs(cur + tiles[i]);
                idxs.erase(i);
            }
        };
        dfs("");
        return s.size() - 1;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 204,
      memory: 24.8,
      desc: '同上',
      code: `class Solution:
    def numTilePossibilities(self, tiles: str) -> int:
        s = set()
        idxs = set()

        def dfs(cur: str):
            s.add(cur)
            if len(cur) == len(tiles):
                return
            for i in range(len(tiles)):
                if i in idxs:
                    continue
                idxs.add(i)
                dfs(cur + tiles[i])
                idxs.remove(i)
        dfs('')
        return len(s) - 1`,
    },
    {
      script: Script.RUST,
      time: 40,
      memory: 3,
      desc: '同上',
      code: `impl Solution {
    pub fn num_tile_possibilities(tiles: String) -> i32 {
        use std::collections::HashSet;
        let tiles = tiles.as_bytes().iter().map(|v| *v).collect::<Vec<u8>>();
        let mut s = HashSet::<String>::new();
        let mut idxs = HashSet::<usize>::new();
        fn dfs(
            s: &mut HashSet<String>,
            idxs: &mut HashSet<usize>,
            tiles: &Vec<u8>,
            cur: &mut Vec<u8>,
        ) {
            s.insert(String::from_utf8(cur.clone()).unwrap());
            if cur.len() != tiles.len() {
                for i in 0..tiles.len() {
                    if !idxs.contains(&i) {
                        idxs.insert(i);
                        cur.push(tiles[i]);
                        dfs(s, idxs, tiles, cur);
                        cur.pop();
                        idxs.remove(&i);
                    }
                }
            }
        }
        let mut cur: Vec<u8> = vec![];
        dfs(&mut s, &mut idxs, &tiles, &mut cur);
        (s.len() - 1) as i32
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
