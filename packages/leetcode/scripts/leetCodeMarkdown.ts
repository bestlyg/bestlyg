import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '1483. 树节点的第 K 个祖先',
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
            time: 901,
            memory: 55.49,
            desc: '倍增法',
            code: `class TreeAncestor:
    def __init__(self, n: int, parents: List[int]):
        self.parents = [[] for _ in range(n + 1)]
        children = [[] for _ in range(n + 1)]
        for i in range(n):
            self.parents[i].append(parents[i])
            children[parents[i]].append(i)
        q = deque([0])
        while q:
            node = q.popleft()
            for child in children[node]:
                q.append(child)
            arr = self.parents[node]
            i = 1
            while node and len(self.parents[arr[i - 1]]) > i - 1:
                arr.append(self.parents[arr[i - 1]][i - 1])
                i += 1

    def getKthAncestor(self, node: int, k: int) -> int:
        idx = 0
        while pow(2, idx + 1) <= k: idx += 1
        if len(self.parents[node]) <= idx: return -1
        if pow(2, idx) == k: return self.parents[node][idx]
        return self.getKthAncestor(self.parents[node][idx], k - pow(2, idx))`,
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
