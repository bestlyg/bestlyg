import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '662. 二叉树最大宽度',
  url: 'https://leetcode.cn/problems/maximum-product-of-two-elements-in-an-array/',
  difficulty: Difficulty.简单,
  tag: [Tag.数组, Tag.排序, Tag.堆_优先队列],
  desc: `给你一个整数数组 nums，请你选择数组的两个不同下标 i 和 j，使 (nums[i]-1)*(nums[j]-1) 取得最大值。`,
  solutions: [
    {
      script: Script.RUST,
      time: 0,
      memory: 2.5,
      desc: '层序遍历',
      code: `use std::cell::RefCell;
use std::collections::VecDeque;
use std::rc::Rc;
impl Solution {
    pub fn width_of_binary_tree(root: Option<Rc<RefCell<TreeNode>>>) -> i32 {
        let root = root.unwrap();
        let mut q = VecDeque::<(i32, Rc<RefCell<TreeNode>>)>::new();
        q.push_back((0, root.clone()));
        let mut ans = 1_i32;
        let mut size = 1;
        while !q.is_empty() {
            let (idx, node) = q.pop_front().unwrap();
            if node.as_ref().borrow().left.is_some() {
                q.push_back((
                    idx * 2 + 1,
                    node.as_ref().borrow().left.as_ref().unwrap().clone(),
                ));
            }
            if node.as_ref().borrow().right.is_some() {
                q.push_back((
                    idx * 2 + 2,
                    node.as_ref().borrow().right.as_ref().unwrap().clone(),
                ));
            }
            size -= 1;
            if size == 0 {
                size = q.len();
                if !q.is_empty() {
                    ans = ans.max(q.back().unwrap().0 - q.front().unwrap().0 + 1);
                }
            }
        }
        ans
    }
}`,
    },
  ],
};
export default leetCodeMarkdown;
