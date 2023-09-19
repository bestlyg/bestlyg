import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '2560. 打家劫舍 IV',
    url: 'https://leetcode.cn/problems/WHnhjV',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `在完成所有的赠送后，请找到拥有最多宝石的勇者和拥有最少宝石的勇者，并返回他们二者的宝石数量之差。`,
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
//         {
//             script: Script.CPP,
//             time: 28,
//             memory: 30.57,
//             desc: 'dfs时记录偷取当前节点和不偷取时的最大值',
//             code: `class Solution {
// public:
//     vector<int> find(TreeNode *node) {
//         vector<int> res{0, 0};
//         if (node) {
//             auto l = find(node->left), r = find(node->right);
//             res[0] = max(l[0], l[1]) + max(r[0], r[1]);
//             res[1] = l[0] + r[0] + node->val;
//         }
//         return res;
//     }
//     int rob(TreeNode* root) {
//         auto res = find(root);
//         return max(res[0], res[1]);
//     }
// };
// `,
//         },
        {
            script: Script.PY,
            time: 520,
            memory: 27.9,
            desc: '同上',
            code: `class Solution:
    def minCapability(self, nums: List[int], k: int) -> int:
        n = len(nums)

        def check(target: int) -> bool:
            cnt = 0
            prev = -1
            for i in range(n):
                if nums[i] <= target and (prev == -1 or prev + 1 != i):
                    prev = i
                    cnt += 1
            return cnt >= k

        l, r = min(nums), max(nums)
        while l < r:
            m = (l + r) // 2
            if check(m):
                r = m
            else:
                l = m + 1
        return l`,
        },
//         {
//             script: Script.RUST,
//             time: 4,
//             memory: 2.81,
//             desc: '同上',
//             code: `use std::cell::RefCell;
// use std::rc::Rc;
// fn find(node: Option<&Rc<RefCell<TreeNode>>>) -> Vec<i32> {
//     let mut res = vec![0, 0];
//     if let Some(node) = node {
//         let node_ref = node.as_ref().borrow();
//         let l = find(node_ref.left.as_ref());
//         let r = find(node_ref.right.as_ref());
//         res[1] = l[0] + r[0] + node_ref.val;
//         res[0] = l.into_iter().max().unwrap() + r.into_iter().max().unwrap();
//     }
//     res
// }
// impl Solution {
//     pub fn rob(root: Option<Rc<RefCell<TreeNode>>>) -> i32 {
//         let node = root.as_ref();
//         find(root.as_ref()).into_iter().max().unwrap()
//     }
// }`,
//         },
    ],
};

export default leetCodeMarkdown;
