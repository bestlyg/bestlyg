pub use std::{cell::RefCell, rc::Rc};
pub use std::collections::BTreeMap;

#[derive(PartialEq, Eq, Clone, Debug)]
pub struct ListNode {
    pub val: i32,
    pub next: Option<Box<ListNode>>,
}

impl ListNode {
    #[inline]
    pub fn new(val: i32) -> Self {
        ListNode { next: None, val }
    }
}

#[derive(Debug, PartialEq, Eq)]
pub struct TreeNode {
    pub val: i32,
    pub left: Option<Rc<RefCell<TreeNode>>>,
    pub right: Option<Rc<RefCell<TreeNode>>>,
}

impl TreeNode {
    #[inline]
    pub fn new(val: i32) -> Self {
        TreeNode {
            val,
            left: None,
            right: None,
        }
    }
}

pub struct MulitSet<T: Ord + Copy + Clone> {
    length: usize,
    tree: BTreeMap<T, usize>,
}
impl<T: Ord + Copy + Clone> MulitSet<T> {
    fn new() -> Self {
        MulitSet {
            length: 0,
            tree: BTreeMap::new(),
        }
    }
    fn contains(&self, k: &T) -> bool {
        self.tree.contains_key(k)
    }
    fn len(&self) -> usize {
        self.length
    }
    fn insert(&mut self, key: T) {
        *self.tree.entry(key).or_insert(0) += 1;
        self.length += 1;
    }
    fn remove(&mut self, key: &T) {
        let item = self.tree.get_mut(&key).unwrap();
        if *item > 1 {
            *item -= 1;
        } else {
            self.tree.remove(key);
        }
        self.length -= 1;
    }
    fn peek_first(&mut self) -> T {
        *self.tree.iter().next().unwrap().0
    }
    fn peek_last(&mut self) -> T {
        *self.tree.iter().rev().next().unwrap().0
    }
    fn pop_first(&mut self) -> T {
        let key = self.peek_first();
        self.remove(&key);
        key
    }
    fn pop_last(&mut self) -> T {
        let key = self.peek_last();
        self.remove(&key);
        key
    }
}
pub fn pow(base: i64, exp: i64, mod_num: i64) -> i64 {
    let mut exp = exp;
    let mut tmp = base;
    let mut ans = 1;
    while exp != 0 {
        if exp % 2 == 1 {
            ans = (ans * tmp) % mod_num;
        }
        tmp = (tmp * tmp) % mod_num;
        exp >>= 1
    }
    ans
}
pub struct Solution;
