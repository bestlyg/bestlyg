import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: 'LCP 41. 黑白翻转棋',
    url: 'https://leetcode.cn/problems/fHi6rV/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `在 n*m 大小的棋盘中，有黑白两种棋子，黑棋记作字母 "X", 白棋记作字母 "O"，空余位置记作 "."。当落下的棋子与其他相同颜色的棋子在行、列或对角线完全包围（中间不存在空白位置）另一种颜色的棋子，则可以翻转这些棋子的颜色。若下一步可放置一枚黑棋，请问选手最多能翻转多少枚白棋。`,
    solutions: [
        //         {
        //             script: Script.TS,
        //             time: 156,
        //             memory: 69,
        //             desc: '对于每个是对象的value，进行dfs',
        //             code: `type Obj = Record<any, any>;

        // function compactObject(obj: Obj): Obj {
        //     const res: any = Array.isArray(obj) ? [] : {};
        //     for (const [k, v] of Object.entries(obj)) {
        //         if (Boolean(v)) {
        //             const newv = typeof v === 'object' ? compactObject(v) : v;
        //             if (Array.isArray(obj)) res.push(newv);
        //             else res[k] = newv;
        //         }
        //     }
        //     return res;
        // };`,
        // },
        {
            script: Script.CPP,
            time: 8,
            memory: 11.4,
            desc: '暴力枚举',
            code: `#define X first
#define Y second
#define pii pair<int, int>

class Solution {
public:
    vector<vector<int>> dirs2 = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}, {1, 1}, {1, -1}, {-1, 1}, {-1, -1}};

    int flipChess(vector<string>& chessboard) {
        int n = chessboard.size(), m = chessboard[0].size(), res = 0;
        function<void(vector<string>&, int, int, int&)> dfs = [&](vector<string>& chessboard, int i, int j, int& sum) {
            vector<pii> list;
            for (auto &dir : dirs2) {
                int ni = i + dir[0], nj = j + dir[1];
                vector<pii> tmp;
                while (ni >= 0 && ni < n && nj >= 0 && nj < m && chessboard[ni][nj] == 'O') {
                    tmp.push_back(make_pair(ni, nj));
                    ni += dir[0];
                    nj += dir[1];
                }
                if (ni >= 0 && ni < n && nj >= 0 && nj < m && chessboard[ni][nj] == 'X') {
                    for (auto &item : tmp) list.push_back(item);
                }
            }

            sum += list.size();

            for (auto &next : list) chessboard[next.X][next.Y] = 'X';
            for (auto &next : list) dfs(chessboard, next.X, next.Y, sum);
        };
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (chessboard[i][j] == '.') {
                    auto board = chessboard;
                    board[i][j] = 'X';
                    int sum = 0;
                    dfs(board, i, j, sum);
                    res = max(res, sum);
                }
            }
        }
        return res;
    }
};`,
        },
        {
            script: Script.PY3,
            time: 88,
            memory: 16,
            desc: '同上',
            code: `dirs2 = [(0, 1), (0, -1), (1, 0), (-1, 0), (1, 1), (1, -1), (-1, 1), (-1, -1)]

    class Solution:
        def flipChess(self, chessboard: List[str]) -> int:
            n = len(chessboard)
            m = len(chessboard[0])
            sum = res = 0
    
            def dfs(board:List[List[str]],i:int,j:int):
                nonlocal sum
                list = []
                for dir in dirs2:
                    ni = i + dir[0]
                    nj = j + dir[1]
                    tmp = []
                    while 0 <= ni < n and 0 <= nj < m and board[ni][nj] == 'O':
                        tmp.append((ni,nj))
                        ni += dir[0]
                        nj += dir[1]
                    if 0 <= ni < n and 0 <= nj < m and board[ni][nj] == 'X':
                        for item in tmp:
                            list.append(item)
                sum += len(list)
    
                for i,j in list: board[i][j] = 'X'
                for i,j in list: dfs(board,i,j)
    
            for i in range(n):
                for j in range(m):
                    if chessboard[i][j] == '.':
                        board = []
                        for item in chessboard:
                            board.append(list(item))
                        board[i][j] = 'X'
                        sum = 0
                        dfs(board, i, j)
                        res = max(res, sum)
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
pub const dirs2: [[i32; 2]; 8] = [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]];

fn dfs(board: &mut Vec<Vec<char>>, sum: &mut i32, i: usize, j: usize) {
    let mut list = vec![];
    for dir in dirs2 {
        let mut ni = i as i32 + dir[0];
        let mut nj = j as i32 + dir[1];
        let mut tmp = vec![];
        while ni >= 0
            && ni < board.len() as i32
            && nj >= 0
            && nj < board[0].len() as i32
            && board[ni as usize][nj as usize] == 'O'
        {
            tmp.push((ni, nj));
            ni += dir[0];
            nj += dir[1];
        }
        if ni >= 0
            && ni < board.len() as i32
            && nj >= 0
            && nj < board[0].len() as i32
            && board[ni as usize][nj as usize] == 'X'
        {
            for item in tmp {
                list.push(item);
            }
        }
    }
    *sum += list.len() as i32;
    for (i, j) in &list {
        board[*i as usize][*j as usize] = 'X';
    }
    for (i, j) in &list {
        dfs(board, sum, *i as usize, *j as usize);
    }
}

impl Solution {
    pub fn flip_chess(chessboard: Vec<String>) -> i32 {
        let chessboard = chessboard
            .into_iter()
            .map(|item| str_to_vec(&item))
            .collect::<Vec<Vec<char>>>();
        let n = chessboard.len();
        let m = chessboard[0].len();
        let mut res = 0;
        for i in 0..n {
            for j in 0..m {
                if chessboard[i][j] == '.' {
                    let mut board = chessboard.clone();
                    board[i][j] = 'X';
                    let mut sum = 0;
                    dfs(&mut board, &mut sum, i, j);
                    res = res.max(sum);
                }
            }
        }
        res
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
