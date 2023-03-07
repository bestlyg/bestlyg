import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1096. 花括号展开 II',
  url: 'https://leetcode.cn/problems/brace-expansion-ii//',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `给出表示基于给定语法规则的表达式 expression，返回它所表示的所有字符串组成的有序列表。`,
  solutions: [
    {
      script: Script.CPP,
      time: 12,
      memory: 10.9,
      desc: '递归遍历',
      code: `class Solution {
public:
    vector<string> braceExpansionII(string expression) {
        if (checkSingal(expression)) expression = expression.substr(1, expression.size() - 2);
        set<string> s;
        vector<string> items = split(expression);
        if (items.size() > 1) {
            for (auto &item : items) {
                for (auto &res : braceExpansionII(item)) {
                    s.insert(res);
                }
            }
        } else {
            string item = items[0];
            vector<vector<string>> res = analysis(item);
            dfs(s, res, 0, "");
        }
        return vector<string>(s.begin(), s.end());
    }
    bool checkSingal(string &expression) {
        if (expression[0] != '{' || expression[expression.size() - 1] != '}') return false;
        int level = 0, i = 0;
        for (; i < expression.size(); i++) {
            if (expression[i] == '{') level++;
            else if (expression[i] == '}') level--;
            if (i != expression.size() - 1 && level == 0) return false;
        }
        return true;
    }
    vector<string> split(string &expression) {
        vector<string> items;
        int level = 0, prev = 0, i = 0;
        for (; i < expression.size(); i++) {
            if (expression[i] == '{') level++;
            else if (expression[i] == '}') level--;
            else if (expression[i] == ',' && level == 0) {
                items.push_back(expression.substr(prev, i - prev));
                prev = i + 1;
            }
        }
        items.push_back(expression.substr(prev, i - prev));
        return items;
    }
    vector<vector<string>> analysis(string &item) {
        vector<vector<string>> res;
        for (int i = 0; i < item.size(); i++) {
            if (item[i] != '{') {
                string s = "";
                s += item[i];
                vector<string> v;
                v.push_back(s);
                res.push_back(v);
            } else {
                int prev = i, level = 0;
                do {
                    if (item[i] == '{') level++;
                    else if (item[i] == '}') level--;
                    if (level != 0) i++;
                } while (level != 0);
                res.push_back(braceExpansionII(item.substr(prev, i - prev + 1)));
            }
        }
        return res;
    }
    void dfs(set<string> &s, vector<vector<string>> &res, int start, string cur) {
        if (start == res.size()) {
            s.insert(cur);
        } else {
            for (int i = 0; i < res[start].size(); i++) {
                dfs(s, res, start + 1, cur + res[start][i]);
            }
        }
    }
};`,
    },
    {
      script: Script.PY3,
      time: 60,
      memory: 15.7,
      desc: '同上',
      code: `from sortedcontainers import SortedSet
class Solution:

    def checkSingal(self, expression: str):
        if expression[0] != '{' or expression[-1] != '}':
            return False
        level, i = 0, 0
        while i < len(expression):
            if expression[i] == '{':
                level += 1
            elif expression[i] == '}':
                level -= 1
            if i != len(expression) - 1 and level == 0:
                return False
            i += 1
        return True

    def split(self, expression: str):
        items = []
        level = prev = i = 0
        while i < len(expression):
            if expression[i] == '{':
                level += 1
            elif expression[i] == '}':
                level -= 1
            elif expression[i] == ',' and level == 0:
                items.append(expression[prev:i])
                prev = i + 1
            i += 1
        items.append(expression[prev:])
        return items

    def analysis(self, item: str):
        res = []
        i = 0
        while i < len(item):
            if item[i] != '{':
                res.append([str(item[i])])
            else:
                prev, level = i, 0
                while True:
                    if item[i] == '{':
                        level += 1
                    elif item[i] == '}':
                        level -= 1
                    if level == 0:
                        break
                    else:
                        i += 1
                res.append(self.braceExpansionII(item[prev:i+1]))
            i += 1
        return res

    def dfs(self, s: SortedSet, res: List[List[str]], start: int, cur: str):
        if start == len(res):
            s.add(cur)
        else:
            for i in range(len(res[start])):
                self.dfs(s, res, start+1, cur+res[start][i])

    def braceExpansionII(self, expression: str) -> List[str]:
        s = SortedSet()
        if self.checkSingal(expression):
            expression = expression[1:-1]
        items = self.split(expression)
        if len(items) > 1:
            for item in items:
                for res in self.braceExpansionII(item):
                    s.add(res)
        else:
            item = items[0]
            res = self.analysis(item)
            self.dfs(s, res, 0, '')
        return list(s)`,
    },
    {
      script: Script.RUST,
      time: 4,
      memory: 2.3,
      desc: '同上',
      code: `use std::collections::BTreeSet;
impl Solution {
    fn check_signal(expression: &Vec<char>) -> bool {
        if *expression.first().unwrap() != '{' || *expression.last().unwrap() != '}' {
            false
        } else {
            let mut level = 0;
            for i in 0..expression.len() {
                if expression[i] == '{' {
                    level += 1
                } else if expression[i] == '}' {
                    level -= 1
                }
                if i != expression.len() - 1 && level == 0 {
                    return false;
                }
            }
            true
        }
    }
    fn split(expression: &Vec<char>) -> Vec<Vec<char>> {
        let mut items: Vec<Vec<char>> = vec![];
        let mut level = 0;
        let mut prev = 0;
        let mut i = 0;
        while i < expression.len() {
            if expression[i] == '{' {
                level += 1;
            } else if expression[i] == '}' {
                level -= 1;
            } else if expression[i] == ',' && level == 0 {
                items.push(
                    expression[prev..i]
                        .iter()
                        .map(|v| *v)
                        .collect::<Vec<char>>(),
                );
                prev = i + 1;
            }
            i += 1;
        }
        items.push(expression[prev..].iter().map(|v| *v).collect::<Vec<char>>());
        items
    }
    fn analysis(item: &Vec<char>) -> Vec<Vec<Vec<char>>> {
        let mut res = vec![];
        let mut i = 0;
        while i < item.len() {
            if item[i] != '{' {
                res.push(vec![vec![item[i]]])
            } else {
                let prev = i;
                let mut level = 0;
                loop {
                    if item[i] == '{' {
                        level += 1;
                    } else if item[i] == '}' {
                        level -= 1;
                    }
                    if level == 0 {
                        break;
                    } else {
                        i += 1;
                    }
                }
                res.push(Solution::_brace_expansion_ii(
                    item[prev..i + 1].iter().map(|v| *v).collect::<Vec<char>>(),
                ))
            }
            i += 1;
        }
        res
    }
    fn dfs(s: &mut BTreeSet<Vec<char>>, res: &Vec<Vec<Vec<char>>>, start: usize, cur: Vec<char>) {
        if start == res.len() {
            s.insert(cur);
        } else {
            for item in res[start].iter() {
                let mut next = cur.clone();
                let mut other = item.clone();
                next.append(&mut other);
                Solution::dfs(s, res, start + 1, next);
            }
        }
    }
    pub fn brace_expansion_ii(expression: String) -> Vec<String> {
        let expression = expression.chars().collect::<Vec<char>>();
        Solution::_brace_expansion_ii(expression)
            .into_iter()
            .map(|v| {
                String::from_utf8(v.into_iter().map(|v| v as u8).collect::<Vec<u8>>()).unwrap()
            })
            .collect()
    }
    fn _brace_expansion_ii(expression: Vec<char>) -> Vec<Vec<char>> {
        let mut expression = expression;
        if Solution::check_signal(&expression) {
            expression.remove(expression.len() - 1);
            expression.remove(0);
        }
        let mut s = BTreeSet::<Vec<char>>::new();
        let items = Solution::split(&expression);
        if items.len() > 1 {
            for item in items {
                for res in Solution::_brace_expansion_ii(item) {
                    s.insert(res);
                }
            }
        } else {
            let res = Solution::analysis(&items[0]);
            Solution::dfs(&mut s, &res, 0, vec![]);
        }
        s.into_iter().collect::<Vec<Vec<char>>>()
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
