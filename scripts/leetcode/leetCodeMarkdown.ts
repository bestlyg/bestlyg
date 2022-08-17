import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '1302. 层数最深叶子节点的和',
  url: 'https://leetcode.cn/problems/design-an-ordered-stream/',
  difficulty: Difficulty.简单,
  tag: [Tag.设计, Tag.数组, Tag.哈希表, Tag.数据流],
  desc: `设计一个流，以 任意 顺序获取 n 个 (id, value) 对，并在多次调用时 按 id 递增的顺序 返回一些值。`,
  solutions: [
    {
      script: Script.RUST,
      time: 12,
      memory: 3,
      desc: '层序遍历',
      code: `use std::cell::RefCell;
use std::collections::VecDeque;
use std::rc::Rc;
impl Solution {
    pub fn deepest_leaves_sum(root: Option<Rc<RefCell<TreeNode>>>) -> i32 {
        let root = root.unwrap();
        let mut q = VecDeque::<Rc<RefCell<TreeNode>>>::new();
        q.push_back(root.clone());
        let mut ans = root.as_ref().borrow().val;
        let mut cur = 0;
        let mut size = 1;
        while !q.is_empty() {
            let node = q.pop_front().unwrap();
            let node = node.as_ref().borrow();
            if node.left.is_some() {
                cur += node.left.as_ref().unwrap().as_ref().borrow().val;
                q.push_back(node.left.as_ref().unwrap().clone());
            }
            if node.right.is_some() {
                cur += node.right.as_ref().unwrap().as_ref().borrow().val;
                q.push_back(node.right.as_ref().unwrap().clone());
            }
            size -= 1;
            if size == 0 {
                size = q.len();
                if size != 0 {
                    ans = cur;
                }
                cur = 0;
            }
        }
        ans
    }
}`,
    },
  ],
};
export default leetCodeMarkdown;
