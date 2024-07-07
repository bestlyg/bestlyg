import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1958. 检查操作是否合法',
    url: 'https://leetcode.cn/problems/check-if-move-is-legal',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你两个整数 rMove 和 cMove 以及一个字符 color ，表示你正在执行操作的颜色（白或者黑），如果将格子 (rMove, cMove) 变成颜色 color 后，是一个 合法 操作，那么返回 true ，如果不是合法操作返回 false 。`,
    solutions: [
        // {
        //     date: new Date('2020.11.11').getTime(),
        //     script: Script.JS,
        //     time: 140,
        //     memory: 45.82,
        //     desc: 'dp',
        //     code: ``,
        // },
        // {
        //     date: new Date('2020.07.25').getTime(),
        //     script: Script.TS,
        //     time: 188,
        //     memory: 39.68,
        //     desc: 'dp[i][j] = 分成i份时，只有前j个元素时的最小值',
        //     code: ``,
        // },

        // {
        //     date: new Date('2022.03.28').getTime(),
        //     script: Script.CPP,
        //     time: 0,
        //     memory: 6.32,
        //     desc: '模拟',
        //     code: ``,
        // },
        {
            script: Script.PY,
            // date: new Date('2024.02.07').getTime(),
            time: 45,
            memory: 16.27,
            desc: '遍历所有方向',
            code: `n = 8
dirs2 = [(0, 1), (0, -1), (1, 0), (-1, 0), (1, 1), (1, -1), (-1, 1), (-1, -1)]

class Solution:
    def checkMove(self, board: List[List[str]], rMove: int, cMove: int, color: str) -> bool:
        recolor = 'W' if color == 'B' else 'B'
        for dir in dirs2:
            nx, ny = rMove + dir[0], cMove + dir[1]
            cnt = 0
            while 0 <= nx < n and 0 <= ny < n:
                if board[nx][ny] == recolor:
                    cnt += 1
                elif board[nx][ny] == color:
                    if cnt >= 1: return True
                    break
                elif board[nx][ny] == '.':
                    break
                nx += dir[0]
                ny += dir[1]
        return False`,
        },
        // {
        //     script: Script.RUST,
        //     time: 53,
        //     memory: 13.54,
        //     desc: '同上',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;
