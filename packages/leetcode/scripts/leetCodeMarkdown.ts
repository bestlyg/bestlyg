import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1448. 统计二叉树中好节点的数目',
    url: 'https://leetcode.cn/problems/count-good-nodes-in-binary-tree/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一棵根为 root 的二叉树，请你返回二叉树中好节点的数目。`,
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
        //     date: new Date('2021.05.13').getTime(),
        //     script: Script.TS,
        //     time: 220,
        //     memory: 48.3,
        //     desc: '归并排序',
        //     code: ``,
        // },
        {
            script: Script.CPP,
            time: 112,
            memory: 84.3,
            desc: 'dfs',
            code: `class Solution {
public:
    int countServers(vector<vector<int>>& grid) {
        int n = grid.size(), m = grid[0].size(), mmap[250][250] = {0};
        pair<int, int> prev = make_pair(-1, -1);
        for (int i = 0; i < n; i++) {
            prev = make_pair(-1, -1);
            for (int j = 0; j < m; j++) {
                if (grid[i][j] == 1) {
                    if (prev.first == -1) prev = make_pair(i, j);
                    else {
                        mmap[prev.first][prev.second] = true;
                        mmap[i][j] = true;
                    }
                }
            }
        }
        for (int j = 0; j < m; j++) {
            prev = make_pair(-1, -1);
            for (int i = 0; i < n; i++) {
                if (grid[i][j] == 1) {
                    if (prev.first == -1) prev = make_pair(i, j);
                    else {
                        mmap[prev.first][prev.second] = true;
                        mmap[i][j] = true;
                    }
                }
            }
        }
        int res = 0;
        for (int i = 0; i < n; i++)
            for (int j = 0; j < m; j++)
                if (mmap[i][j]) res += 1;
        return res;
    }
};`,
        },
        {
            script: Script.PY,
            time: 204,
            memory: 34.5,
            desc: '同上',
            code: `class Solution:
    def goodNodes(self, root: TreeNode) -> int:
        res = 0
        def dfs(node: TreeNode, max: int):
            nonlocal res
            if not node: return
            if node.val >= max:
                max = node.val
                res += 1
            dfs(node.left, max)
            dfs(node.right, max)
        dfs(root, -inf)
        return res`,
        },
        {
            script: Script.RUST,
            time: 20,
            memory: 6.7,
            desc: '同上',
            code: `use std::cell::RefCell;
use std::rc::Rc;
impl Solution {
    pub fn good_nodes(root: Option<Rc<RefCell<TreeNode>>>) -> i32 {
        let mut res = 0;
        fn dfs(res: &mut i32, node: &Option<Rc<RefCell<TreeNode>>>, mut max: i32) {
            if let Some(ref node) = node {
                let node_ref = node.as_ref().borrow();
                if node_ref.val >= max {
                    max = node_ref.val;
                    *res += 1;
                }
                dfs(res, &node_ref.left, max);
                dfs(res, &node_ref.right, max);
            }
        }
        dfs(&mut res, &root, i32::MIN);
        res
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
