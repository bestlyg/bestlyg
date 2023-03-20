#![allow(unused)]

use crate::utils::NumSize;
use std::fmt::Display;

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
#[derive(Debug, Clone)]
pub(crate) struct Node {
    pub(crate) value: NodeType,
    pub(crate) left: Option<Box<Node>>,
    pub(crate) right: Option<Box<Node>>,
}
impl Node {
    pub(crate) fn to_tree(nums: &[NumSize], ops: &[char]) -> Vec<Box<Node>> {
        if nums.len() == 1 {
            vec![Box::new(Node::new(NodeType::Num(nums[0])))]
        } else {
            let mut res = vec![];
            for i in 0..ops.len() {
                let lefts = Node::to_tree(&nums[0..i + 1], &ops[0..i]);
                let rights = Node::to_tree(&nums[i + 1..], &ops[i + 1..]);
                for left in &lefts {
                    for right in &rights {
                        let mut root = Box::new(Node::new(NodeType::Op(ops[i])));
                        root.as_mut().left = Some(left.clone());
                        root.as_mut().right = Some(right.clone());
                        res.push(root);
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
                match op {
                    '+' => left.compute() + right.compute(),
                    '-' => left.compute() - right.compute(),
                    '*' => left.compute() * right.compute(),
                    '/' => left.compute() / right.compute(),
                    _ => panic!("a unkown operation"),
                }
            }
        }
    }
}

impl Display for Node {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        if self.value.is_num() {
            write!(f, "{}", self.value)
        } else {
            write!(
                f,
                "({}) {} ({})",
                self.left.as_ref().unwrap(),
                self.value,
                self.right.as_ref().unwrap()
            )
        }
    }
}
