import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2385. 感染二叉树需要的总时间',
    url: 'https://leetcode.cn/problems/amount-of-time-for-binary-tree-to-be-infected/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `返回感染整棵树需要的分钟数。`,
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
            time: 331,
            memory: 59.43,
            desc: 'dfs',
            code: `class Solution:
    def amountOfTime(self, root: Optional[TreeNode], start: int) -> int:
        parent = {root:None}
        start_node = None
        q = deque([root])
        while q:
            node = q.popleft()
            if node.val == start: start_node = node
            if node.left: parent[node.left] = node; q.append(node.left)
            if node.right: parent[node.right] = node; q.append(node.right)
        def dfs(node: Optional[TreeNode], pre_node: Optional[TreeNode]):
            if not node: return 0
            res = 0
            if parent[node] and parent[node] != pre_node:
                res = max(res, dfs(parent[node], node))
            if node.left and node.left != pre_node:
                res = max(res, dfs(node.left, node))
            if node.right and node.right != pre_node:
                res=  max(res, dfs(node.right, node))
            return res + 1
        return dfs(start_node, None) - 1`,
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
