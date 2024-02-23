import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2583. 二叉树中的第 K 大层和',
    url: 'https://leetcode.cn/problems/kth-largest-sum-in-a-binary-tree/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一棵二叉树的根节点 root 和一个正整数 k 。树中的 层和 是指 同一层 上节点值的总和。返回树中第 k 大的层和（不一定不同）。如果树少于 k 层，则返回 -1 。。`,
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
            time: 267,
            memory: 51.8,
            desc: 'bfs',
            code: `class Solution:
    def kthLargestLevelSum(self, root: Optional[TreeNode], k: int) -> int:
        if not root: return []
        q = deque() 
        q.append(root)
        size = 1
        sums = [root.val]
        while q:
            node = q.popleft()
            if node.left: q.append(node.left)
            if node.right: q.append(node.right)
            size -= 1
            if size == 0:
                size = len(q)
                if q: sums.append(sum(node.val for node in q))
        if len(sums) < k: return -1
        return sorted(sums)[-k]`,
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
