import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '2700. 两个对象之间的差异',
  url: 'https://leetcode.cn/problems/differences-between-two-objects/',
  difficulty: Difficulty.简单,
  tag: [],
  desc: `请你编写一个函数，它接收两个深度嵌套的对象或数组 obj1 和 obj2 ，并返回一个新对象表示它们之间差异。`,
  solutions: [
    {
      script: Script.TS,
      time: 76,
      memory: 45.3,
      desc: 'dfs',
      code: `// 特殊标识符，在左右相等时返回
const same = Symbol('same');
// 存储所有已经存在的key
function mergeKey(key1: string[], key2: string[]) {
    const set1 = new Set(key1);
    const set2 = new Set(key2);
    const res = new Set<string>();
    for (const k of set1) {
        if (set2.has(k)) res.add(k);
    }
    return res;
}

function objDiff(obj1: any, obj2: any, topLevel = true): any {
    const t1 = typeof obj1;
    const t2 = typeof obj2;
    // 类型不等，肯定不等
    if (t1 !== t2) return [obj1, obj2];
    // 如果不是对象，直接判断是否相等
    if (t1 !== 'object') return obj1 === obj2 ? same : [obj1, obj2];
    // 如果是null或undefined，直接判断防止下面出错
    if (obj1 === null || obj1 === undefined || obj2 === null || obj2 === undefined) return same;
    // 如果一个是数组一个不是数组，那就不等
    if (
        (!Array.isArray(obj1) && Array.isArray(obj2)) ||
        (Array.isArray(obj1) && !Array.isArray(obj2))
    )
        return [obj1, obj2];
    // 此时肯定是对象或数组
    // 拿所有共存的key
    const keys = mergeKey(Object.keys(obj1), Object.keys(obj2));
    const res = {};
    // 遍历obj1中所有的kv
    for (const [k, v] of Object.entries(obj1).filter(([k]) => keys.has(k))) {
        // 递归比较，利用topLevel记录是不是顶层
        const diff = objDiff(v, obj2[k], false);
        // 如果不同就存储
        if (diff != same) res[k] = diff;
    }
    // 如果是空的，但是是顶层的，那就返回相等
    if (Object.keys(res).length === 0 && !topLevel) return same;
    // 否则顶层要返回控对象
    return res;
}`,
    },
//         {
//           script: Script.CPP,
//           time: 4,
//           memory: 7.4,
//           desc: '哈希存储',
//           code: `class Solution {
// public:
//     string oddString(vector<string>& words) {
//         unordered_map<string, vector<string>> m;
//         for (auto &w : words) {
//             string key = "";            
//             for (int i = 0; i < w.size() - 1; i++) key += to_string(w[i + 1] - w[i] + '0');
//             m[key].push_back(w);
//         }
//         for (auto &item : m) {
//             if (item.second.size() == 1) return item.second[0];
//         }
//         return words[0];
//     }
// };`,
//         },
//         {
//           script: Script.PY3,
//           time: 48,
//           memory:15.9,
//           desc: '同上',
//           code: `class Solution:
//     def oddString(self, words: List[str]) -> str:
//         m = dict()
//         for w in words:
//             key = ""
//             for i in range(len(w) - 1):
//                 key += chr(ord(w[i + 1]) - ord(w[i]) + ord('0'))
//             if not key in m: m[key] = []
//             m[key].append(w)
//         for v in m.values():
//             if len(v) == 1:
//                 return v[0]
//         return words[0]`,
//         },
//         {
//           script: Script.RUST,
//           time: 0,
//           memory: 2.1,
//           desc: '同上',
//           code: `pub fn str_to_vec(s: &String) -> Vec<char> {
//     s.chars().collect()
// }
// impl Solution {
//     pub fn odd_string(words: Vec<String>) -> String {
//         let mut m = std::collections::HashMap::<String, Vec<String>>::new();
//         for w in words {
//             let mut key = String::new();
//             {
//                 let w: Vec<char> = str_to_vec(&w);
//                 for i in 0..w.len() - 1 {
//                     key.push((w[i + 1] as u8 - w[i] as u8 + b'0') as char);
//                 }
//             }
//             m.entry(key).or_insert(vec![]).push(w);
//         }
//         for (_, list) in m.into_iter() {
//             if list.len() == 1 {
//                 return list[0].clone();
//             }
//         }
//         String::new()
//     }
// }`,
//         },
  ],
};

export default leetCodeMarkdown;
