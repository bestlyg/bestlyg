import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2337. 移动片段得到字符串',
    url: 'https://leetcode.cn/problems/move-pieces-to-obtain-a-string/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `如果在移动字符串 start 中的片段任意次之后可以得到字符串 target ，返回 true ；否则，返回 false 。`,
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
            time: 56,
            memory: 18.6,
            desc: '判断start的L都在target右侧，R都在target左侧。',
            code: `class Solution {
public:
    bool canChange(string start, string target) {
        int n = start.size(), i1 = 0, i2 = 0;
        while (i1 < n && start[i1] == '_') i1 += 1;
        while (i2 < n && target[i2] == '_') i2 += 1;
        while (i1 < n && i2 < n) {
            if (start[i1] != target[i2]) return false;
            if (start[i1] == 'L' && i1 < i2) return false;
            if (start[i1] == 'R' && i1 > i2) return false;
            i1 += 1;
            i2 += 1;
            while (i1 < n && start[i1] == '_') i1 += 1;
            while (i2 < n && target[i2] == '_') i2 += 1;
        }
        return i1 == n && i2 == n;
    }
};`,
        },
        {
            script: Script.PY,
            time: 240,
            memory: 16.43,
            desc: '同上',
            code: `class Solution:
    def canChange(self, start: str, target: str) -> bool:
        n = len(start)
        i1 = i2 = 0
        while i1 < n and start[i1] == '_':
            i1 += 1
        while i2 < n and target[i2] == '_':
            i2 += 1
        while i1 < n and i2 < n:
            if start[i1] != target[i2]:
                return False
            if start[i1] == 'L' and i1 < i2:
                return False
            if start[i1] == 'R' and i1 > i2:
                return False
            i1 += 1
            i2 += 1
            while i1 < n and start[i1] == '_':
                i1 += 1
            while i2 < n and target[i2] == '_':
                i2 += 1
        return i1 == n and i2 == n`,
        },
        {
            script: Script.RUST,
            time: 12,
            memory: 3.1,
            desc: '同上',
            code: `pub fn str_to_vec(s: &String) -> Vec<char> {
    s.chars().collect()
}
impl Solution {
    pub fn can_change(start: String, target: String) -> bool {
        let start = str_to_vec(&start);
        let target = str_to_vec(&target);
        let n = start.len();
        let (mut i1, mut i2) = (0, 0);
        while i1 < n && start[i1] == '_' {
            i1 += 1;
        }
        while i2 < n && target[i2] == '_' {
            i2 += 1;
        }
        while (i1 < n && i2 < n) {
            if start[i1] != target[i2] {
                return false;
            }
            if start[i1] == 'L' && i1 < i2 {
                return false;
            }
            if start[i1] == 'R' && i1 > i2 {
                return false;
            }
            i1 += 1;
            i2 += 1;
            while i1 < n && start[i1] == '_' {
                i1 += 1;
            }
            while i2 < n && target[i2] == '_' {
                i2 += 1;
            }
        }
        i1 == n && i2 == n
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
