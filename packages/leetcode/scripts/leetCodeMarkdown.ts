import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist:true,
    name: '70. 爬楼梯',
    url: 'https://leetcode.cn/problems/next-greater-numerically-balanced-number',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个整数 n ，请你返回 严格大于 n 的 最小数值平衡数 。`,
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
        //     script: Script.CPP,
        //     time: 4,
        //     memory: 7.03,
        //     desc: '打表',
        //     code: ``,
        // },
        {
            script: Script.PY,
            time: 36,
            memory: 16.67,
            desc: 'dp',
            code: `class Solution:
    def climbStairs(self, n: int) -> int:
        if n == 1: return 1
        dp = [0] * (n + 1)
        dp[1] = 1
        dp[2] = 2
        for i in range(3, n + 1):
            dp[i] = dp[i - 1] + dp[i - 2]
        print(dp)
        return dp[n]`,
        },
        //         {
        //             script: Script.RUST,
        //             time: 0,
        //             memory: 2.17,
        //             desc: '同上',
        //             code: `use std::cell::RefCell;
        // use std::rc::Rc;
        // impl Solution {
        //     pub fn bst_to_gst(mut root: Option<Rc<RefCell<TreeNode>>>) -> Option<Rc<RefCell<TreeNode>>> {
        //         let mut sums = 0;
        //         fn dfs(node: &mut Option<Rc<RefCell<TreeNode>>>, sums: &mut i32) {
        //             if let Some(node) = node {
        //                 let mut node_ref = node.as_ref().borrow_mut();
        //                 dfs(&mut node_ref.right, sums);
        //                 *sums += node_ref.val;
        //                 node_ref.val = *sums;
        //                 dfs(&mut node_ref.left, sums);
        //             }
        //         }
        //         dfs(&mut root, &mut sums);
        //         root
        //     }
        // }`,
        //         },
    ],
};

export default leetCodeMarkdown;
