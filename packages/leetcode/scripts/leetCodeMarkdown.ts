import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '415. 字符串相加',
    url: 'https://leetcode.cn/problems/sum-of-distances-in-tree/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给定一个无向、连通的树。树中有 n 个标记为 0...n-1 的节点以及 n-1 条边 。给定整数 n 和数组 edges ， edges[i] = [ai, bi]表示树中的节点 ai 和 bi 之间有一条边。返回长度为 n 的数组 answer ，其中 answer[i] 是树中第 i 个节点与所有其他节点之间的距离之和。`,
    solutions: [
        // {
        //     date: new Date('2020/10/06').getTime(),
        //     script: Script.JS,
        //     time: 224,
        //     memory: 54.2,
        //     desc: 'dfs',
        //     code: ``,
        // },
        {
            script: Script.CPP,
            time: 8,
            memory: 54.4,
            desc: '遍历',
            code: `class Solution {
public:
    string addStrings(string num1, string num2) {
        if (num1.size() < num2.size()) swap(num1, num2);
        string res = "";
        reverse(num1.begin(), num1.end());
        reverse(num2.begin(), num2.end());
        int i = 0, add = 0;
        while (i < num1.size() || i < num2.size()) {
            int num = num1[i] - '0' + add;
            if (i < num2.size()) num += num2[i] - '0';
            if (num >= 10) {
                num -= 10;
                add = 1;
            } else {
                add = 0;
            }
            res = to_string(num) + res;
            i++;
        }
        if (add) res = "1" + res;
        return res;
    }
};`,
        },
        {
            script: Script.PY,
            time: 56,
            memory: 15.9,
            desc: '同上',
            code: `class Solution:
    def addStrings(self, s1: str, s2: str) -> str:
        if len(s1) < len(s2):
            s1, s2 = s2, s1
        res = ""
        num1, num2 = list(s1), list(s2)
        num1.reverse()
        num2.reverse()
        i = add = 0
        while i < len(num1) or i < len(num2):
            num = ord(num1[i]) - ord('0') + add
            if i < len(num2):
                num += ord(num2[i]) - ord('0')
            if num >= 10:
                num -= 10
                add = 1
            else:
                add = 0
            res = str(num) + res
            i += 1
        if add:
            res = "1" + res
        return res`,
        },
        {
            script: Script.RUST,
            time: 0,
            memory: 2.1,
            desc: '同上',
            code: `pub fn str_to_vec(s: &String) -> Vec<char> {
    s.chars().collect()
}
impl Solution {
    pub fn add_strings(num1: String, num2: String) -> String {
        let mut num1 = str_to_vec(&num1);
        let mut num2 = str_to_vec(&num2);
        num1.reverse();
        num2.reverse();
        if num1.len() < num2.len() {
            std::mem::swap(&mut num1, &mut num2);
        }
        let mut res = vec![];
        let mut i = 0;
        let mut add = 0;
        while i < num1.len() || i < num2.len() {
            let mut num = num1[i].to_digit(10).unwrap() as u8 + add;
            if i < num2.len() {
                num += num2[i].to_digit(10).unwrap() as u8;
            }
            if num >= 10 {
                num -= 10;
                add = 1;
            } else {
                add = 0;
            }
            res.push(num + b'0');
            i += 1;
        }
        if add != 0 {
            res.push(b'1');
        }
        res.reverse();
        String::from_utf8(res).unwrap()
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
