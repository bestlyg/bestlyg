import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '979. 在二叉树中分配硬币',
    url: 'https://leetcode.cn/problems/minimum-falling-path-sum/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个 n x n 的 方形 整数数组 matrix ，请你找出并返回通过 matrix 的下降路径 的 最小和 。`,
    solutions: [
        //         {
        //             script: Script.TS,
        //             time: 156,
        //             memory: 69,
        //             desc: '对于每个是对象的value，进行dfs',
        //             code: `type Obj = Record<any, any>;

        // function compactObject(obj: Obj): Obj {
        //     const res: any = Array.isArray(obj) ? [] : {};
        //     for (const [k, v] of Object.entries(obj)) {
        //         if (Boolean(v)) {
        //             const newv = typeof v === 'object' ? compactObject(v) : v;
        //             if (Array.isArray(obj)) res.push(newv);
        //             else res[k] = newv;
        //         }
        //     }
        //     return res;
        // };`,
        // },
        {
            script: Script.CPP,
            time: 8,
            memory: 13.5,
            desc: 'dfs',
            code: `#define X first
#define Y second
#define pii pair<int, int>
class Solution {
public:
    int distributeCoins(TreeNode* root) {
        int res = 0;
        function<pii(TreeNode*)> dfs = [&](TreeNode *node) {
            if (!node) return make_pair(0, 0);
            auto l = dfs(node->left), r = dfs(node->right);
            int nsum = l.X + r.X + 1, csum = l.Y + r.Y + node->val;
            res += abs(nsum - csum);
            return make_pair(nsum, csum);
        };
        dfs(root);
        return res;
    }
};`,
        },
        {
            script: Script.PY,
            time: 52,
            memory: 16.1,
            desc: '同上',
            code: `class Solution:
    def distributeCoins(self, root: Optional[TreeNode]) -> int:
        res = 0

        def dfs(node: Optional[TreeNode]) -> Tuple[int, int]:
            nonlocal res
            if not node:
                return (0, 0)
            l = dfs(node.left)
            r = dfs(node.right)
            nsum = l[0] + r[0] + 1
            csum = l[1] + r[1] + node.val
            res += abs(nsum-csum)
            return (nsum, csum)

        dfs(root)
        return res`,
        },
        {
            script: Script.RUST,
            time: 0,
            memory: 2.1,
            desc: '同上',
            code: `use std::cell::RefCell;
use std::rc::Rc;
impl Solution {
    pub fn distribute_coins(root: Option<Rc<RefCell<TreeNode>>>) -> i32 {
        let mut res = 0;
        fn dfs(res: &mut i32, node: &Option<Rc<RefCell<TreeNode>>>) -> (i32, i32) {
            match node {
                None => (0, 0),
                Some(node) => {
                    let node_ref = node.as_ref().borrow();
                    let l = dfs(res, &node_ref.left);
                    let r = dfs(res, &node_ref.right);
                    let nsum = l.0 + r.0 + 1;
                    let csum = l.1 + r.1 + node_ref.val;
                    *res += (nsum - csum).abs();
                    (nsum, csum)
                }
            }
        }
        dfs(&mut res, &root);
        return res;
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
