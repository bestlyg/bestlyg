use std::fmt::Display;

fn permutation<T: Clone>(list: &[T], same: bool) -> Vec<Vec<T>> {
    use std::collections::HashSet;
    let n = list.len();
    let mut set = HashSet::<usize>::new();
    let mut res = vec![];
    let mut item: Vec<T> = vec![];
    fn dfs<T: Clone>(
        n: usize,
        list: &[T],
        res: &mut Vec<Vec<T>>,
        set: &mut HashSet<usize>,
        same: bool,
        item: &mut Vec<T>,
    ) {
        if item.len() == n {
            res.push(item.clone());
        } else {
            for i in 0..n {
                if !same && set.contains(&i) {
                    continue;
                }
                item.push(list[i].clone());
                set.insert(i);
                dfs::<T>(n, list, res, set, same, item);
                set.remove(&i);
                item.pop();
            }
        }
    }
    dfs::<T>(n, list, &mut res, &mut set, same, &mut item);
    res
}

type NumSize = f64;
#[derive(Debug, Clone, Copy)]
enum NodeType {
    Op(char),
    Num(NumSize),
}
impl NodeType {
    fn is_op(&self) -> bool {
        match self {
            Self::Op(_) => true,
            _ => false,
        }
    }
    fn is_num(&self) -> bool {
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
struct Node {
    value: NodeType,
    left: Option<Box<Node>>,
    right: Option<Box<Node>>,
}
impl Node {
    fn new(value: NodeType) -> Self {
        Node {
            value,
            left: None,
            right: None,
        }
    }
    fn compute(&self) -> NumSize {
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
        if self.left.is_some() && self.right.is_some() || self.value.is_num() {
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

fn toTree(nums: &[NumSize], ops: &[char]) -> Vec<Box<Node>> {
    if nums.len() == 1 {
        vec![Box::new(Node::new(NodeType::Num(nums[0])))]
    } else {
        let mut res = vec![];
        for i in 0..ops.len() {
            let lefts = toTree(&nums[0..i + 1], &ops[0..i]);
            let rights = toTree(&nums[i + 1..], &ops[i + 1..]);
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

fn compute24(nums: &[NumSize], ops: &[char], isEqual: fn(val: NumSize) -> bool) -> Vec<String> {
    let mut res = vec![];
    let lnums: Vec<&[NumSize]> = vec![];
    let lops: Vec<&[char]> = vec![];
    for nums in lnums {
        for ops in &lops {
            let trees = toTree(nums, ops.clone());
            for tree in trees {
                if isEqual(tree.compute()) {
                    res.push(format!("{}", tree))
                }
            }
        }
    }
    res
}
