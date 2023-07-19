import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '874. 模拟行走机器人',
    url: 'https://leetcode.cn/problems/walking-robot-simulation/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `返回从原点到机器人所有经过的路径点（坐标为整数）的最大欧式距离的平方。`,
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
            time: 100,
            memory: 47.7,
            desc: '模拟',
            code: `#define X first
#define Y second
#define pii pair<int, int>
vector<vector<int>> dirs = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};
class Solution {
public:
    int robotSim(vector<int>& commands, vector<vector<int>>& obstacles) {
        unordered_map<int, unordered_map<int, bool>> m;
        for (auto &item : obstacles) m[item[0]][item[1]] = true;
        int d = 0, res = 0;
        pii cur = make_pair(0, 0);
        for (auto &cmd : commands) {
            if (cmd == -1) d = (d + 1) % 4;
            else if (cmd == -2) d = (d - 1 + 4) % 4;
            else while (cmd--) {
                if (m.count(cur.X + dirs[d][0]) && m[cur.X + dirs[d][0]].count(cur.Y + dirs[d][1])) break;
                cur.X += dirs[d][0];
                cur.Y += dirs[d][1];
                res = max(res, (int)(pow(cur.X, 2) + pow(cur.Y, 2)));
            }
        }
        return res;
    }
};`,
        },
        // {
        //     script: Script.PY,
        //     time: 944,
        //     memory: 64.9,
        //     desc: '同上',
        //     code: ``,
        // },
        // {
        //     script: Script.RUST,
        //     time: 88,
        //     memory: 12.1,
        //     desc: '同上',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;
