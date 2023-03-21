#![allow(unused)]

use crate::{utils::NumSize, operation};
use std::{cell::RefCell, fmt::Display, rc::Rc};

#[derive(Debug, Clone, Copy)]
pub(crate) enum NodeType {
    Op(char),
    Num(NumSize),
}
impl NodeType {
    pub(crate) fn is_op(&self) -> bool {
        match self {
            Self::Op(_) => true,
            _ => false,
        }
    }
    pub(crate) fn is_num(&self) -> bool {
        match self {
            Self::Num(_) => true,
            _ => false,
        }
    }
}
impl Display for NodeType {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Self::Num(v) => write!(f, "{}", v),
            Self::Op(v) => write!(f, "{}", v),
        }
    }
}

type RcNode = Rc<RefCell<Node>>;
#[derive(Debug, Clone)]
pub(crate) struct Node {
    pub(crate) value: NodeType,
    pub(crate) left: Option<Rc<RefCell<Node>>>,
    pub(crate) right: Option<Rc<RefCell<Node>>>,
}
impl Node {
    pub(crate) fn to_tree(nums: &[NumSize], ops: &[char]) -> Vec<RcNode> {
        if nums.len() == 1 {
            vec![Rc::new(RefCell::new(Node::new(NodeType::Num(nums[0]))))]
        } else {
            let mut res = vec![];
            for i in 0..ops.len() {
                let lefts = Node::to_tree(&nums[0..i + 1], &ops[0..i]);
                let rights = Node::to_tree(&nums[i + 1..], &ops[i + 1..]);
                for left in &lefts {
                    for right in &rights {
                        let mut root = Node::new(NodeType::Op(ops[i]));
                        root.left = Some(left.clone());
                        root.right = Some(right.clone());
                        res.push(Rc::new(RefCell::new(root)));
                    }
                }
            }
            res
        }
    }
    pub(crate) fn new(value: NodeType) -> Self {
        Node {
            value,
            left: None,
            right: None,
        }
    }
    pub(crate) fn compute(&self) -> NumSize {
        match self.value {
            NodeType::Num(v) => v,
            NodeType::Op(op) => {
                let left = self.left.as_ref().unwrap();
                let right = self.right.as_ref().unwrap();
                operation(left.borrow().compute(), right.borrow().compute(), op)
            }
        }
    }
}

impl Display for Node {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        if self.value.is_num() {
            write!(f, "{}", self.value)
        } else {
            let left = self.left.as_ref().unwrap();
            let right = self.right.as_ref().unwrap();
            write!(f, "({}) {} ({})", left.borrow(), self.value, right.borrow())
        }
    }
}
