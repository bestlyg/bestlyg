import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1457. 二叉树中的伪回文路径',
    url: 'https://leetcode.cn/problems/pseudo-palindromic-paths-in-a-binary-tree',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一棵二叉树，每个节点的值为 1 到 9 。我们称二叉树中的一条路径是 「伪回文」的，当它满足：路径经过的所有节点值的排列中，存在一个回文序列。请你返回从根到叶子节点的所有路径中 伪回文 路径的数目。`,
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
        //     date: new Date('2020.12.28').getTime(),
        //     script: Script.TS,
        //     time: 120,
        //     memory: 44.6,
        //     desc: 'dp',
        //     code: ``,
        // },
        // {
        //     date: new Date('2022.06.20').getTime(),
        //     script: Script.CPP,
        //     time: 200,
        //     memory: 66.95,
        //     desc: '有序集合',
        //     code: ``,
        // },
        {
            script: Script.PY,
            time: 656,
            memory: 90.31,
            desc: 'dfs',
            code: `class Solution:
    def pseudoPalindromicPaths (self, root: Optional[TreeNode]) -> int:
        def dfs(node: Optional[TreeNode], val: int) -> int:
            if not node: return 0
            val ^= (1 << node.val)
            if not node.left and not node.right: return int(val == 0 or (val & (-val)) == val)
            return dfs(node.left, val) + dfs(node.right, val)
        return dfs(root, 0)`,
        },
        // {
        //     script: Script.RUST,
        //     time: 564,
        //     memory: 85,
        //     desc: '同上',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;
