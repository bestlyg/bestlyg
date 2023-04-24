import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '2650. 设计可取消函数器',
  url: 'https://leetcode.cn/problems/design-cancellable-function/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `有时候你会有一个长时间运行的任务，并且你可能希望在它完成之前取消它。为了实现这个目标，请你编写一个名为 cancellable 的函数，它接收一个生成器对象，并返回一个包含两个值的数组：一个 取消函数 和一个 promise 对象。`,
  solutions: [
    {
      script: Script.TS,
      time: 64,
      memory: 42.5,
      desc: 'dfs',
      code: `function cancellable<T>(generator: Generator<Promise<any>, T, unknown>): [() => void, Promise<T>] {
  let cancel = false;
  function dfs(node) {
    if (node.done) return Promise.resolve(node.value);
    if (node.value instanceof Promise)
      return node.value.then(
        res => (cancel ? dfs(generator.throw('Cancelled')) : dfs(generator.next(res))),
        res => dfs(generator.throw(res))
      );
    else return dfs(generator.next(node.value));
  }
  return [
    () => (cancel = true),
    new Promise<T>((resolve, reject) => dfs(generator.next()).then(resolve, reject)),
  ];
}`,
    },
    //     {
    //       script: Script.CPP,
    //       time: 44,
    //       memory: 25.8,
    //       desc: '先找到最末尾的字符，再对该字符为起点到结尾的字符串进行比较',
    //       code: `class Solution {
    // public:
    //     string lastSubstring(string s) {
    //         int n = s.size(), imax = 0;
    //         vector<int> idxs;
    //         for (int i = 0; i < n; i++) {
    //             if (s[imax] < s[i]) imax = i, idxs.clear();
    //             if (s[imax] == s[i]) idxs.push_back(i);
    //         }
    //         imax = 0;
    //         for (int i = 1; i < idxs.size(); i++) {
    //             int i1 = idxs[imax] + 1, i2 = idxs[i] + 1;
    //             while (i2 < n && s[i1] == s[i2]) i1++, i2++;
    //             if (i2 == n) break;
    //             if (s[i1] < s[i2]) imax = i;
    //         }
    //         return s.substr(idxs[imax], n - idxs[imax]);
    //     }
    // };`,
    //     },
    //     {
    //       script: Script.PY3,
    //       time: 6360,
    //       memory: 18,
    //       desc: '同上',
    //       code: `class Solution:
    //   def lastSubstring(self, s: str) -> str:
    //       return max(s[i:] for i in range(len(s)))`,
    //     },
    //     {
    //       script: Script.RUST,
    //       time: 16,
    //       memory: 5.9,
    //       desc: '同上',
    //       code: `fn str_to_vec(s: &String) -> Vec<char> {
    //     s.chars().collect()
    // }
    // impl Solution {
    //     pub fn last_substring(s: String) -> String {
    //         let s = str_to_vec(&s);
    //         let n = s.len();
    //         let mut imax = 0;
    //         let mut idxs = vec![];
    //         for i in 0..n {
    //             if (s[imax] as u8) < (s[i] as u8) {
    //                 imax = i;
    //                 idxs.clear();
    //             }
    //             if (s[imax] as u8) == (s[i] as u8) {
    //                 idxs.push(i);
    //             }
    //         }
    //         imax = 0;
    //         for i in 1..idxs.len() {
    //             let (mut i1, mut i2) = (idxs[imax] + 1, idxs[i] + 1);
    //             while i2 < n && s[i1] == s[i2] {
    //                 i1 += 1;
    //                 i2 += 1;
    //             }
    //             if i2 == n {
    //                 break;
    //             }
    //             if s[i1] < s[i2] {
    //                 imax = i;
    //             }
    //         }
    //         String::from_utf8(s[idxs[imax]..].iter().map(|v| *v as u8).collect()).unwrap()
    //     }
    // }`,
    //     },
  ],
};

export default leetCodeMarkdown;
