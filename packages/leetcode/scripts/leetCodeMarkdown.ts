import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1373. 二叉搜索子树的最大键值和',
  url: 'https://leetcode.cn/problems/maximum-sum-bst-in-binary-tree/',
  difficulty: Difficulty.简单,
  tag: [],
  desc: `给你一棵以 root 为根的 二叉树 ，请你返回 任意 二叉搜索子树的最大键值和`,
  solutions: [
    //         {
    //           script: Script.TS,
    //           time: 76,
    //           memory:45.5,
    //           desc: '利用余数为0判断是否产生分割',
    //           code: `function chunk(arr: any[], size: number): any[][] {
    //     const res: any[][] = [];
    //     const item: any[] = [];
    //     for (let i = 1; i <= arr.length; i++) {
    //         item.push(arr[i - 1]);
    //         if (i % size === 0) res.push([...item]), (item.length = 0);
    //     }
    //     if (item.length) res.push([...item]);
    //     return res;
    // }`,
    //         },
    {
      script: Script.CPP,
      time: 128,
      memory: 110.6,
      desc: '遍历左右子树的同时记录最大值，最小值和总和',
      code: `struct Node {
    int l, r, sum;
    Node(int l, int r, int sum): l(l), r(r), sum(sum) {}
};

class Solution {
public:
    int maxSumBST(TreeNode* root) {
        int res = 0;
        Node no(INT_MIN, -1, -1);
        function<Node(TreeNode*)> dfs = [&](TreeNode *node) -> Node {
            if (!node) return no;
            int val = node->val;
            auto lv = dfs(node->left), rv = dfs(node->right);
            if (node->left == nullptr && node->right == nullptr) {
                res = max(res, val);
                return Node(val, val, val);
            } else if (node->left == nullptr) {
                if (rv.l == no.l) return no;
                if (val >= rv.l) return no;
                rv.l = val;
                rv.sum += val;
                res = max(res, rv.sum);
                return rv;
            } else if (node->right == nullptr) {
                if (lv.l == no.l) return no;
                if (lv.r >= val) return no;
                lv.r = val;
                lv.sum += val;
                res = max(res, lv.sum);
                return lv;
            } else {
                if (lv.l == no.l || rv.l == no.l) return no;
                if (lv.r >= val) return no;
                if (val >= rv.l) return no;
                Node next(lv.l, rv.r, lv.sum + rv.sum + val);
                res = max(res, next.sum);
                return next;
            }
        };
        dfs(root);
        return res;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 304,
      memory: 65.5,
      desc: '同上',
      code: `class Node:
    def __init__(self, l: int, r: int, sum: int):
        self.l = l
        self.r = r
        self.sum = sum


class Solution:
    def maxSumBST(self, root: Optional[TreeNode]) -> int:
        res = 0
        no = Node(-inf, -1, -1)

        def dfs(node: Optional[TreeNode]) -> Node:
            nonlocal res
            if not node:
                return no
            val = node.val
            lv, rv = dfs(node.left), dfs(node.right)
            if node.left == None and node.right == None:
                res = max(res, val)
                return Node(val, val, val)
            elif node.left == None:
                if rv.l == no.l:
                    return no
                if val >= rv.l:
                    return no
                rv.l = val
                rv.sum += val
                res = max(res, rv.sum)
                return rv
            elif node.right == None:
                if lv.l == no.l:
                    return no
                if lv.r >= val:
                    return no
                lv.r = val
                lv.sum += val
                res = max(res, lv.sum)
                return lv
            else:
                if lv.l == no.l or rv.l == no.l:
                    return no
                if lv.r >= val:
                    return no
                if val >= rv.l:
                    return no
                next = Node(lv.l, rv.r, lv.sum + rv.sum + val)
                res = max(res, next.sum)
                return next
        dfs(root)
        return res`,
    },
    {
      script: Script.RUST,
      time: 24,
      memory: 9.8,
      desc: '同上',
      code: `static NoVal: i32 = i32::MIN;
#[derive(Debug, Clone)]
struct Node {
    l: i32,
    r: i32,
    sum: i32,
}
impl Node {
    fn new(l: i32, r: i32, sum: i32) -> Node {
        Node { l, r, sum }
    }
    fn no() -> Node {
        Node {
            l: NoVal,
            r: 0,
            sum: 0,
        }
    }
}
use std::cell::RefCell;
use std::rc::Rc;
impl Solution {
    pub fn max_sum_bst(root: Option<Rc<RefCell<TreeNode>>>) -> i32 {
        let mut res = 0;
        dfs(&mut res, &root);
        res
    }
}
fn dfs(res: &mut i32, node: &Option<Rc<RefCell<TreeNode>>>) -> Node {
    match node {
        Some(node) => {
            let nodeRef = node.as_ref().borrow();
            let val = nodeRef.val;
            let (mut lv, mut rv) = (dfs(res, &nodeRef.left), dfs(res, &nodeRef.right));
            if nodeRef.left.is_none() && nodeRef.right.is_none() {
                *res = (*res).max(val);
                Node::new(val, val, val)
            } else if nodeRef.left.is_none() {
                if rv.l == NoVal {
                    Node::no()
                } else if val >= rv.l {
                    Node::no()
                } else {
                    rv.l = val;
                    rv.sum += val;
                    *res = (*res).max(rv.sum);
                    rv
                }
            } else if nodeRef.right.is_none() {
                if lv.l == NoVal {
                    Node::no()
                } else if lv.r >= val {
                    Node::no()
                } else {
                    lv.r = val;
                    lv.sum += val;
                    *res = (*res).max(lv.sum);
                    lv
                }
            } else {
                if lv.l == NoVal || rv.l == NoVal {
                    Node::no()
                } else if lv.r >= val {
                    Node::no()
                } else if val >= rv.l {
                    Node::no()
                } else {
                    let next = Node::new(lv.l, rv.r, lv.sum + rv.sum + val);
                    *res = (*res).max(next.sum);
                    next
                }
            }
        }
        None => Node::no(),
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
