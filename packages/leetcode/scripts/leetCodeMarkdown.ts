import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist:! true,
    name: '865. 具有所有最深节点的最小子树',
    url: 'https://leetcode.cn/problems/smallest-subtree-with-all-the-deepest-nodes/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给定一个根为 root 的二叉树，每个节点的深度是 该节点到根的最短距离 。返回包含原始树中所有 最深节点 的 最小子树 。`,
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
            time: 8,
            memory:13.76,
            desc: 'dfs',
            code: `class Solution {
public:
    TreeNode* subtreeWithAllDeepest(TreeNode* root) {
        function<pair<int, TreeNode*>(TreeNode*, int)> dfs = [&](TreeNode *node, int level) -> pair<int, TreeNode*> {
            pair<int, TreeNode*> res = make_pair(level, node);
            if (node->left) {
                res = dfs(node->left, level + 1);
            }
            if (node->right) {
                auto rres = dfs(node->right, level + 1);
                if (rres.first > res.first) res = rres;
                else if (rres.first == res.first) res.second = node;
            }
            return res;
        };
        return dfs(root, 0).second;
    }
};`,
        },
        // {
        //     script: Script.PY,
        //     time: 52,
        //     memory: 16.27,
        //     desc: '同上',
        //     code: ``,
        // },
        // {
        //     script: Script.RUST,
        //     time: 0,
        //     memory: 2.05,
        //     desc: '同上',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;
