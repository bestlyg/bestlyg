import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1110. 删点成林',
    url: 'https://leetcode.cn/problems/delete-nodes-and-return-forest/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给出二叉树的根节点 root，树上每个节点都有一个不同的值。如果节点值在 to_delete 中出现，我们就把该节点从树上删去，最后得到一个森林（一些不相交的树构成的集合）。返回森林中的每棵树。你可以按任意顺序组织答案。`,
    solutions: [
        //     {
        //       script: Script.TS,
        //       time: 76,
        //       memory: 45.3,
        //       desc: 'dfs',
        //       code: `// 特殊标识符，在左右相等时返回
        // }`,
        //     },
        {
            script: Script.CPP,
            time:12,
            memory: 13.3,
            desc: 'dfs遍历时，记录父节点是否已经被删除',
            code: `class Solution {
public:
    vector<TreeNode*> res;
    unordered_set<int> s;
    vector<TreeNode*> delNodes(TreeNode* root, vector<int>& to_delete) {
        for (auto &v : to_delete) s.insert(v);
        dfs(root, true);
        return res;
    }
    TreeNode* dfs(TreeNode *node, bool pd) {
        if (!node) return node;
        bool del = s.count(node->val);
        if (!del && pd) res.push_back(node);
        node->left = dfs(node->left, del);
        node->right = dfs(node->right, del);
        if (pd || del) return nullptr;
        return node;
    }
};`,
        },
        {
            script: Script.PY3,
            time: 72,
            memory: 16.6,
            desc: '同上',
            code: `class Solution:
    def delNodes(self, root: Optional[TreeNode], to_delete: List[int]) -> List[TreeNode]:
        res = []
        s = set()
        for v in to_delete:
            s.add(v)

        def dfs(node: Optional[TreeNode], pd: bool):
            if node == None:
                return node
            d = node.val in s
            if not d and pd:
                res.append(node)
            node.left = dfs(node.left, d)
            node.right = dfs(node.right, d)
            return None if pd or d else node
        dfs(root, True)
        return res`,
        },
        {
            script: Script.RUST,
            time: 4,
            memory: 2.2,
            desc: '同上',
            code: `use std::cell::RefCell;
use std::collections::HashSet;
use std::ops::RangeBounds;
use std::rc::Rc;
type Res = Vec<Option<Rc<RefCell<TreeNode>>>>;
fn dfs(
    res: &mut Res,
    s: &HashSet<i32>,
    node: &mut Option<Rc<RefCell<TreeNode>>>,
    pd: bool,
) -> Option<Rc<RefCell<TreeNode>>> {
    match node {
        None => None,
        Some(ref node) => {
            let mut nodeRef = node.as_ref().borrow_mut();
            let d = s.contains(&nodeRef.val);
            if !d && pd {
                res.push(Some(node.clone()));
            }
            nodeRef.left = dfs(res, s, &mut nodeRef.left, d);
            nodeRef.right = dfs(res, s, &mut nodeRef.right, d);
            if pd || d {
                None
            } else {
                Some(node.clone())
            }
        }
    }
}

impl Solution {
    pub fn del_nodes(mut root: Option<Rc<RefCell<TreeNode>>>, to_delete: Vec<i32>) -> Res {
        let mut s = std::collections::HashSet::<i32>::new();
        for v in to_delete {
            s.insert(v);
        }
        let mut res: Res = vec![];
        dfs(&mut res, &s, &mut root, true);
        res
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
