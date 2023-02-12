import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1138. 字母板上的路径',
  url: 'https://leetcode.cn/problems/alphabet-board-path/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `给你一个下标从 0 开始、长度为 3 的整数数组 amount ，其中 amount[0]、amount[1] 和 amount[2] 分别表示需要装满冷水、温水和热水的杯子数量。返回装满所有杯子所需的 最少 秒数。`,
  solutions: [
    {
      script: Script.CPP,
      time: 12,
      memory: 11.5,
      desc: 'bfs',
      code: `typedef pair<int, int> pii;
int dirs[4][2] = {
    {-1, 0}, {1, 0},
    {0, -1}, {0, 1}, 
};
string dir_str = "UDLR";
struct Node {
    pii dir;
    string s; 
    Node(pii dir, string s): dir(dir), s(s) {}
};
class Solution {
public:
    string alphabetBoardPath(string target) {
        vector<string> list = { "abcde", "fghij", "klmno", "pqrst", "uvwxy", "z" };
        vector<pii> idxs(26);
        for (int i = 0; i < list.size(); i++) for (int j = 0; j < list[i].size(); j++) idxs[list[i][j] - 'a'] = make_pair(i, j);
        vector<vector<string>> cache(26, vector<string>(26, ""));
        for (int i = 0; i < 26; i++) prebuild(cache, idxs, list, i);
        string res = "";
        char prev = 'a';
        for (int i = 0; i < target.size(); i++) {
            res += cache[prev - 'a'][target[i] - 'a'] + "!";
            prev = target[i];
        }
        return res;    
    }

    void prebuild(vector<vector<string>> &cache, vector<pii> &idxs, vector<string> &list, int idx) {
        queue<Node> q; 
        q.push(Node(idxs[idx], ""));
        while (q.size()) {
            Node cur = q.front();
            q.pop();
            for (int i = 0; i < 4; i++) {
                int nrow = cur.dir.first + dirs[i][0], ncol = cur.dir.second + dirs[i][1];
                if (nrow < 0 || nrow >= list.size() || ncol < 0 || ncol >= list[nrow].size()) continue;
                if (list[nrow][ncol] - 'a' == idx || cache[idx][list[nrow][ncol] - 'a'] != "") continue;
                string s = cur.s + dir_str[i];
                q.push(Node(make_pair(nrow, ncol), s));
                cache[idx][list[nrow][ncol] - 'a'] = s;
            }
        }
    }
};`,
    },
    {
      script: Script.PY3,
      time: 232,
      memory: 15.1,
      desc: '同上',
      code: `from queue import Queue
class Solution:
  def alphabetBoardPath(self, target: str) -> str:
      dirs = [
          (-1, 0), (1, 0),
          (0, -1), (0, 1)
      ]
      dir_str = "UDLR"
      l = ["abcde", "fghij", "klmno", "pqrst", "uvwxy", "z"]
      idxs = [()] * 26
      for i in range(len(l)):
          for j in range(len(l[i])):
              idxs[ord(l[i][j]) - ord('a')] = (i, j)
      cache = [[""] * 26 for _ in range(26)]
      def prebuild(idx):
          q = Queue()
          q.put((idxs[idx][0], idxs[idx][1], ""))
          while q.qsize():
              (row,col,s) = q.get()
              for i in range(4):
                  nrow = row + dirs[i][0]
                  ncol = col + dirs[i][1]
                  if nrow < 0 or nrow >= len(l) or ncol < 0 or ncol >= len(l[nrow]):
                      continue
                  if ord(l[nrow][ncol]) - ord('a') == idx or cache[idx][ord(l[nrow][ncol]) - ord('a')] != "":
                      continue
                  next_s = s + dir_str[i]
                  q.put((nrow, ncol, next_s))
                  cache[idx][ord(l[nrow][ncol]) - ord('a')] = next_s
      for i in range(26):
          prebuild(i)
      res = ''
      prev = 'a'
      for cur in target:
          res += cache[ord(prev) - ord('a')][ord(cur) - ord('a')] + "!"
          prev = cur
      return res`,
    },
    {
      script: Script.RUST,
      time: 4,
      memory: 2.3,
      desc: '同上',
      code: `impl Solution {
    pub fn alphabet_board_path(target: String) -> String {
        let dirs: [[i32; 2]; 4] = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        let dir_str = "UDLR".chars().collect::<Vec<char>>();
        let l = vec!["abcde", "fghij", "klmno", "pqrst", "uvwxy", "z"]
            .into_iter()
            .map(|s| s.chars().collect::<Vec<char>>())
            .collect::<Vec<Vec<char>>>();
        let mut cache = vec![vec![String::new(); 26]; 26];
        let mut idxs = vec![(0, 0); 26];
        for i in 0..l.len() {
            for j in 0..l[i].len() {
                idxs[l[i][j] as usize - 'a' as usize] = (i, j)
            }
        }
        let mut prebuild = |idx: usize| {
            use std::collections::VecDeque;
            let mut q = VecDeque::<(usize, usize, String)>::new();
            q.push_back((idxs[idx].0, idxs[idx].1, String::new()));
            while !q.is_empty() {
                let (row, col, s) = q.pop_front().unwrap();
                for i in 0..4 {
                    let nrow = row as i32 + dirs[i][0];
                    let ncol = col as i32 + dirs[i][1];
                    if nrow < 0
                        || nrow as usize >= l.len()
                        || ncol < 0
                        || ncol as usize >= l[nrow as usize].len()
                    {
                        continue;
                    }
                    let nrow = nrow as usize;
                    let ncol = ncol as usize;
                    if l[nrow][ncol] as usize - 'a' as usize == idx
                        || cache[idx][l[nrow][ncol] as usize - 'a' as usize] != ""
                    {
                        continue;
                    }
                    let mut next_s = s.clone();
                    next_s.push(dir_str[i]);
                    q.push_back((nrow, ncol, next_s.clone()));
                    cache[idx][l[nrow][ncol] as usize - 'a' as usize] = next_s;
                }
            }
        };
        for i in 0..26 {
            prebuild(i)
        }

        let mut res = String::new();
        let mut prev = 'a';
        for cur in target.chars() {
            res.push_str(&cache[prev as usize - 'a' as usize][cur as usize - 'a' as usize]);
            res.push('!');
            prev = cur
        }
        res
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
