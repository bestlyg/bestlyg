import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '722. 删除注释',
    url: 'https://leetcode.cn/problems/card-flipping-game/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `从源代码中删除注释后，需要以相同的格式返回源代码。`,
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
            time: 0,
            memory: 7.54,
            desc: '逐行遍历',
            code: `class Solution {
public:
    vector<string> removeComments(vector<string>& source) {
        vector<string> res;
        int check = false;
        string s = "";
        for (auto &line : source) {
            for (int i = 0; i < line.size(); i++) {
                if (line[i] == '*' && i + 1 < line.size() && line[i + 1] == '/' && check) {
                    check = false;
                    i += 1;
                } else if (check) {
                } else if (line[i] == '/' && i + 1 < line.size() && line[i + 1] == '*') {
                    check = true;
                    i += 1;
                } else if (line[i] == '/' && i + 1 < line.size() && line[i + 1] == '/') {
                    break;
                } else {
                    s += line[i];
                }
            }
            if (!check && s.size()) {
                res.push_back(s);
                s = "";
            }
        }
        return res;
    }
};`,
        },
        {
            script: Script.PY,
            time: 44,
            memory: 15.77,
            desc: '同上',
            code: `class Solution:
    def removeComments(self, source: List[str]) -> List[str]:
        res = []
        check = False
        s = ""
        for line in source:
            i = 0
            while i < len(line):
                if line[i] == '*' and i + 1 < len(line) and line[i + 1] == '/' and check:
                    check = False
                    i += 1
                elif check:
                    pass
                elif line[i] == '/' and i + 1 < len(line) and line[i + 1] == '*':
                    check = True
                    i += 1
                elif line[i] == '/' and i + 1 < len(line) and line[i + 1] == '/':
                    break
                else:
                    s += line[i]
                i += 1
            if not check and len(s):
                res.append(s)
                s = ""
        return res`,
        },
        {
            script: Script.RUST,
            time: 0,
            memory: 1.92,
            desc: '同上',
            code: `pub fn str_to_vec(s: &String) -> Vec<char> {
    s.chars().collect()
}
impl Solution {
    pub fn remove_comments(source: Vec<String>) -> Vec<String> {
        let mut res = vec![];
        let mut check = false;
        let mut s = String::new();
        for line in source {
            let line = str_to_vec(&line);
            let mut i = 0;
            while i < line.len() {
                if line[i] == '*' && i + 1 < line.len() && line[i + 1] == '/' && check {
                    check = false;
                    i += 1
                } else if check {
                } else if line[i] == '/' && i + 1 < line.len() && line[i + 1] == '*' {
                    check = true;
                    i += 1;
                } else if line[i] == '/' && i + 1 < line.len() && line[i + 1] == '/' {
                    break;
                } else {
                    s.push(line[i]);
                }
                i += 1;
            }
            if !check && !s.is_empty() {
                res.push(s.clone());
                s = String::new();
            }
        }
        res
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
