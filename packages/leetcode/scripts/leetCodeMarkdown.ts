import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1222. 可以攻击国王的皇后',
    url: 'https://leetcode.cn/problems/queens-that-can-attack-the-king',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `在一个 8x8 的棋盘上，放置着若干「黑皇后」和一个「白国王」。给定一个由整数坐标组成的数组 queens ，表示黑皇后的位置；以及一对坐标 king ，表示白国王的位置，返回所有可以攻击国王的皇后的坐标(任意顺序)。`,
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
        //     date: new Date('2020.08.05').getTime(),
        //     script: Script.TS,
        //     time: 96,
        //     memory: 40.3,
        //     desc: '归并排序',
        //     code: ``,
        // },
        {
            script: Script.CPP,
            time: 8,
            memory: 10.97,
            desc: '方向数组遍历',
            code: `vector<vector<int>> dirs2 = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}, {1, 1}, {1, -1}, {-1, 1}, {-1, -1}};

class Solution {
public:
    vector<vector<int>> queensAttacktheKing(vector<vector<int>>& queens, vector<int>& king) {
        vector<vector<bool>> board(8, vector<bool>(8, false));
        for (auto &q : queens) board[q[0]][q[1]] = true;
        vector<vector<int>> res;
        auto check = [&](vector<int> pos, vector<int> &dir) {
            for (int i = 1; i < 8; i++) {
                pos[0] += dir[0];
                pos[1] += dir[1];
                if (0 <= pos[0] && pos[0] < 8 && 0 <= pos[1] && pos[1] < 8) {
                    if (board[pos[0]][pos[1]]) {
                        res.push_back(pos);
                        return;
                    }
                } else return;
            }
        };
        for (auto &d : dirs2) check(king, d);
        return res;
    }
};`,
        },
        {
            script: Script.PY,
            time: 40,
            memory: 16,
            desc: '同上',
            code: `class Solution:
    def queensAttacktheKing(self, queens: List[List[int]], king: List[int]) -> List[List[int]]:
        dirs2 = [(0, 1), (0, -1), (1, 0), (-1, 0),
                    (1, 1), (1, -1), (-1, 1), (-1, -1)]
        board = [[False for j in range(8)] for i in range(8)]
        for [x, y] in queens:
            board[x][y] = True
        res = []
        for i in range(1, 8):
            if not dirs2: break
            for j in range(len(dirs2) - 1, -1, -1):
                x = king[0] + dirs2[j][0] * i
                y = king[1] + dirs2[j][1] * i
                if 0 <= x < 8 and 0 <= y < 8:
                    if board[x][y]:
                        res.append([x, y])
                        dirs2.remove(dirs2[j])
                else:
                    dirs2.remove(dirs2[j])
        return res`,
        },
        {
            script: Script.PY,
            time: 48,
            memory: 15.65,
            desc: '同上',
            code: `dirs = [(0, 1), (0, -1), (1, 0), (-1, 0), (1, 1), (1, -1), (-1, 1), (-1, -1)]

    class Solution:
        def queensAttacktheKing(self, queens: List[List[int]], king: List[int]) -> List[List[int]]:
            board = [[False for j in range(8)] for i in range(8)]
            for [x, y] in queens:
                board[x][y] = True
            res = []
            def check(pos: List[int], dir: List[int]) -> bool:
                for _ in range(1, 8):
                    pos[0] += dir[0]
                    pos[1] += dir[1]
    
                    if 0 <= pos[0] < 8 and 0 <= pos[1] < 8:
                        if board[pos[0]][pos[1]]:
                            res.append([pos[0], pos[1]])
                            return 
                    else:
                        return
            for d in dirs:
                check(list(king), d)
            return res`,
        },
        {
            script: Script.RUST,
            time: 0,
            memory: 2.1,
            desc: '同上',
            code: `pub const DIRS2: [[i32; 2]; 8] = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
];

impl Solution {
    pub fn queens_attackthe_king(queens: Vec<Vec<i32>>, king: Vec<i32>) -> Vec<Vec<i32>> {
        let mut board = vec![vec![false; 8]; 8];
        for queen in queens {
            board[queen[0] as usize][queen[1] as usize] = true;
        }
        let mut res = vec![];
        let mut check = |mut pos: Vec<usize>, dir: &[i32]| {
            for i in 1..8 {
                let x = pos[0] as i32 + dir[0] * i;
                let y = pos[1] as i32 + dir[1] * i;
                if 0 <= x && x < 8 && 0 <= y && y < 8 {
                    if board[x as usize][y as usize] {
                        res.push(vec![x, y]);
                        return;
                    }
                } else {
                    return;
                }
            }
        };
        for d in &DIRS2 {
            check(king.iter().map(|v| *v as usize).collect(), d);
        }
        res
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
