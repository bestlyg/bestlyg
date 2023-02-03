import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1145. 二叉树着色游戏',
  url: 'https://leetcode.cn/problems/binary-tree-coloring-game',
  difficulty: Difficulty.中等,
  tag: [Tag.树, Tag.深度优先搜索, Tag.二叉树],
  desc: `现在，假设你是「二号」玩家，根据所给出的输入，假如存在一个 y 值可以确保你赢得这场游戏，则返回 true ；若无法获胜，就请返回 false 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 4,
      memory: 10.9,
      desc: 'x把树分成三部分，y只可能拦住x的某一条去路才是最大值，计算三个方向可以拦住的最多节点',
      code: `struct Node {
    int cnt, lcnt, rcnt;
    TreeNode *p;
    Node(): cnt(0), lcnt(0), rcnt(0), p(nullptr) {}
};
class Solution {
public:
    bool btreeGameWinningMove(TreeNode* root, int n, int x) {
        vector<Node> list(n + 1);
        int parent = -1;
        dfs(list, root, parent, parent, x);
        bool ans = false;
        if (parent != -1) ans |= list[root->val].cnt - list[x].cnt > list[x].cnt;
        if (list[x].p->left) ans |= list[root->val].cnt - list[list[x].p->left->val].cnt < list[list[x].p->left->val].cnt;
        if (list[x].p->right) ans |= list[root->val].cnt - list[list[x].p->right->val].cnt < list[list[x].p->right->val].cnt;
        return ans;
    }
    int dfs(vector<Node> &list, TreeNode *root, int &parent, int cur_parent, int x) {
        if (!root) return 0;
        if (root->val == x) parent = cur_parent;
        auto &node = list[root->val];
        node.p = root;
        node.lcnt = dfs(list, root->left, parent, root->val, x);
        node.rcnt = dfs(list, root->right, parent, root->val, x);
        node.cnt = node.lcnt + node.rcnt + 1;
        return node.cnt;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 40,
      memory: 15.2,
      desc: '同上',
      code: `class Node:
    def __init__(self) -> None:
        self.cnt = self.lcnt = self.rcnt = 0
        self.p = None

class Solution:
    def btreeGameWinningMove(self, root: Optional[TreeNode], n: int, x: int) -> bool:
        list = [Node() for _ in range(n + 1)]
        parent = -1

        def dfs(root: Optional[TreeNode], cur_parent: int) -> int:
            nonlocal parent
            if root == None:
                return 0
            if root.val == x:
                parent = cur_parent
            node = list[root.val]
            node.p = root
            node.lcnt = dfs(root.left, root.val)
            node.rcnt = dfs(root.right, root.val)
            node.cnt = node.lcnt + node.rcnt + 1
            return node.cnt

        dfs(root, -1)
        ans = False
        if parent != -1:
            ans |= list[root.val].cnt - list[x].cnt > list[x].cnt
        if list[x].p.left:
            ans |= list[root.val].cnt - \
                list[list[x].p.left.val].cnt < list[list[x].p.left.val].cnt
        if list[x].p.right:
            ans |= list[root.val].cnt - \
                list[list[x].p.right.val].cnt < list[list[x].p.right.val].cnt
        return ans`,
    },
    {
      script: Script.RUST,
      time: 0,
      memory: 2.2,
      desc: '同上',
      code: `use std::cell::RefCell;
use std::rc::Rc;
#[derive(Clone)]
struct Node {
    cnt: i32,
    lcnt: i32,
    rcnt: i32,
    p: Option<Rc<RefCell<TreeNode>>>,
}
impl Node {
    fn new() -> Self {
        Self {
            cnt: 0,
            lcnt: 0,
            rcnt: 0,
            p: None,
        }
    }
}

impl Solution {
    pub fn btree_game_winning_move(root: Option<Rc<RefCell<TreeNode>>>, n: i32, x: i32) -> bool {
        let val = root.as_ref().unwrap().as_ref().borrow().val as usize;
        let x = x as usize;
        let n = n as usize;
        let list = vec![Node::new(); n + 1];
        let mut parent = -1;
        let (list, _) = Solution::dfs(list, root, &mut parent, -1, x as i32);
        let mut ans = false;
        if parent != -1 {
            ans |= list[val].cnt - list[x].cnt > list[x].cnt;
        }
        let child = &list[x].p.as_ref().unwrap().as_ref().borrow().left;
        if child.is_some() {
            let lval = child.as_ref().unwrap().as_ref().borrow().val as usize;
            ans |= list[val].cnt - list[lval].cnt < list[lval].cnt;
        }
        let child = &list[x].p.as_ref().unwrap().as_ref().borrow().right;
        if child.is_some() {
            let rval = child.as_ref().unwrap().as_ref().borrow().val as usize;
            ans |= list[val].cnt - list[rval].cnt < list[rval].cnt;
        }
        ans
    }
    fn dfs(
        list: Vec<Node>,
        root: Option<Rc<RefCell<TreeNode>>>,
        parent: *mut i32,
        cur_parent: i32,
        x: i32,
    ) -> (Vec<Node>, i32) {
        match root {
            Some(root) => {
                let mut list = list;
                let root_node = root.as_ref().borrow();
                if root_node.val == x {
                    unsafe {
                        *parent = cur_parent;
                    }
                }
                let val = root_node.val as usize;
                list[val].p = Some(root.clone());
                let (mut list, cnt) =
                    Solution::dfs(list, root_node.left.clone(), parent, root_node.val, x);
                list[val].lcnt = cnt;
                let (mut list, cnt) =
                    Solution::dfs(list, root_node.right.clone(), parent, root_node.val, x);
                list[val].rcnt = cnt;
                list[val].cnt = list[val].lcnt + list[val].rcnt + 1;
                let cnt = list[val].cnt;
                (list, cnt)
            }
            None => (list, 0),
        }
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
