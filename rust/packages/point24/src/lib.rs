mod node;
mod utils;

use node::Node;
pub use utils::{permutation, NumSize};

pub fn compute24(
    nums: &[NumSize],
    ops: &[char],
    is_equal: fn(val: NumSize) -> bool,
) -> Vec<String> {
    let mut res = vec![];
    let lnums = permutation(nums, false, nums.len());
    let lops = permutation(ops, true, nums.len() - 1);
    for nums in &lnums {
        for ops in &lops {
            let trees = Node::to_tree(nums, ops);
            for tree in trees {
                // println!("tree : {}", tree);
                if is_equal(tree.compute()) {
                    res.push(format!("{}", tree))
                }
            }
        }
    }
    res
}

#[test]
fn test_1() {
    fn is_equal(val: NumSize) -> bool {
        const TARGET: NumSize = 24.0;
        (val - TARGET).abs() <= 1e-6
    }
    let nums = vec![2, 4, 10, 10]
        .into_iter()
        .map(|v| v as NumSize)
        .collect::<Vec<NumSize>>();
    let ops = vec!['+', '-', '*', '/'];
    let res = compute24(&nums, &ops, is_equal);
    let set = std::collections::HashSet::<String>::from_iter(res.iter().map(|v| v.clone()));
    println!("{:?}", set.iter().collect::<Vec<&String>>());
    assert!(set.len() == 4);
}
