import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '833. 字符串中的查找与替换',
    url: 'https://leetcode.cn/problems/find-and-replace-in-string/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `在对 s 执行所有替换操作后返回 结果字符串 。`,
    solutions: [
        // {
        //     date: new Date('2020.04.26').getTime(),
        //     script: Script.JS,
        //     time: 384,
        //     memory: 44.78,
        //     desc: '归并排序',
        //     code: ``,
        // },
        // {
        //     date: new Date('2021.05.13').getTime(),
        //     script: Script.TS,
        //     time: 220,
        //     memory: 48.3,
        //     desc: '归并排序',
        //     code: ``,
        // },
        {
            script: Script.CPP,
            time: 8,
            memory: 13.16,
            desc: '从后往前遍历',
            code: `class Solution {
public:
    string findReplaceString(string s, vector<int>& indices, vector<string>& sources, vector<string>& targets) {
        int n = indices.size();
        vector<int> idxs;
        for (int i = 0; i < n; i++) idxs.push_back(i);
        sort(idxs.begin(), idxs.end(), [&](auto &i1, auto &i2) {
            return indices[i2] < indices[i1];
        });
        auto check = [&](int &start, string &source) {
            for (int i = 0; i < source.size(); i++) {
                if (start + i >= s.size() || source[i] != s[start + i]) return false;
            }
            return true;
        };
        for (int idx = 0; idx < n; idx++) {
            int i = idxs[idx];
            if (check(indices[i], sources[i])) {
                s = s.substr(0, indices[i]) + targets[i] + s.substr(indices[i] + sources[i].size());
            }
        }
        return s;
    }
};`,
        },
        {
            script: Script.PY,
            time: 44,
            memory: 16.1,
            desc: '同上',
            code: `class Solution:
    def findReplaceString(self, s: str, indices: List[int], sources: List[str], targets: List[str]) -> str:
        n = len(indices)
        idxs = [i for i in range(n)]
        idxs.sort(key=lambda i: indices[i], reverse=True)
        for idx in range(n):
            i = idxs[idx]
            if s[indices[i]:indices[i]+len(sources[i])] == sources[i]:
                s = s[0:indices[i]] + targets[i] + \
                    s[indices[i]+len(sources[i]):]
                print(s)
        return s`,
        },
        {
            script: Script.RUST,
            time: 0,
            memory: 2.1,
            desc: '同上',
            code: `impl Solution {
    pub fn find_replace_string(
        mut s: String,
        indices: Vec<i32>,
        sources: Vec<String>,
        targets: Vec<String>,
    ) -> String {
        let indices = indices.into_iter().map(|i| i as usize).collect::<Vec<_>>();
        let n = indices.len();
        let mut idxs = (0..n).collect::<Vec<_>>();
        idxs.sort_by_key(|i| indices[*i]);
        idxs.reverse();
        for i in idxs {
            if indices[i] + sources[i].len() <= s.len() && s[indices[i]..indices[i] + sources[i].len()] == sources[i] {
                let mut ns = String::new();
                ns.push_str(&s[0..indices[i]]);
                ns.push_str(&targets[i]);
                ns.push_str(&s[indices[i] + sources[i].len()..]);
                s = ns;
            }
        }
        s
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
