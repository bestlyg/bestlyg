import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '2476. 二叉搜索树最近节点查询',
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
            time: 582,
            memory: 74.37,
            desc: 'dfs后排序处理queries',
            code: `class Solution:
    def closestNodes(self, root: Optional[TreeNode], queries: List[int]) -> List[List[int]]:
        arr = []
        def inorder(node: Optional[TreeNode]):
            if not node: return
            inorder(node.left)
            arr.append(node.val)
            inorder(node.right)
        inorder(root)
        idx = 0
        ans = [[] for _ in range(len(queries))]
        queries = sorted((q, i) for i, q in enumerate(queries))
        for q, i in queries:
            while idx < len(arr) and arr[idx] < q:
                idx += 1
            ans[i] = [-1, -1]
            if idx < len(arr) and arr[idx] == q:
                ans[i] = [q, q]
            else:
                if idx > 0: ans[i][0] = arr[idx - 1]
                if idx < len(arr): ans[i][1] = arr[idx]
        return ans`,
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
