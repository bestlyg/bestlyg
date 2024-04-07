import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '1600. 王位继承顺序',
    url: 'https://leetcode.cn/problems/kth-ancestor-of-a-tree-node',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `树节点的第 k 个祖先节点是从该节点到根节点路径上的第 k 个节点。`,
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
        {
            script: Script.PY,
            // date: new Date('2024.02.07').getTime(),
            time: 333,
            memory: 68.36,
            desc: '前序遍历',
            code: `class ThroneInheritance:
    def __init__(self, kingName: str):
        self.kingName = kingName
        self.children = defaultdict(list)
        self.dead = set()
    def birth(self, parentName: str, childName: str) -> None:
        self.children[parentName].append(childName)
    def death(self, name: str) -> None:
        self.dead.add(name)
    def successor(self, x: str, curOrder: List[str]) -> List[str]:
        if x not in self.dead: curOrder.append(x)
        for child in self.children[x]:
            self.successor(child, curOrder)
        return curOrder
    def getInheritanceOrder(self) -> List[str]:
        return self.successor(self.kingName, [])`,
        },

        //         {
        //             script: Script.CPP,
        //             time: 44,
        //             memory: 70.5,
        //             desc: '同上',
        //             code: `class Solution {
        // public:
        //     int getScore(vector<int>& player) {
        //         int cur = 0, sum = 0;
        //         for (auto &v: player) {
        //             sum += v + v * ((cur & 0b11) != 0);
        //             cur = cur << 1 | (v == 10);
        //         }
        //         return sum;
        //     }
        //     int isWinner(vector<int>& player1, vector<int>& player2) {
        //         int s1 = getScore(player1), s2 = getScore(player2);
        //         return s1 > s2 ? 1 : s2 > s1 ? 2 : 0;
        //     }
        // };`,
        //         },
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
