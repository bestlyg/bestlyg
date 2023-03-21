mod node;
mod utils;

use node::Node;
pub use utils::*;

use wasm_bindgen::prelude::*;

pub fn compute24(nums: &[NumSize], ops: &[char], target: NumSize) -> Vec<String> {
    let mut res = vec![];
    let lnums = permutation(nums, false, nums.len());
    let lops = permutation(ops, true, nums.len() - 1);
    for nums in &lnums {
        for ops in &lops {
            let trees = Node::to_tree(nums, ops);
            for tree in trees {
                // println!("tree : {}", tree);
                let node = tree.as_ref().borrow();
                if (target - node.compute()).abs() <= EPSILON {
                    res.push(format!("{}", node))
                }
            }
        }
    }
    res
}

#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub fn compute24_wasm(nums: Box<[NumSize]>, ops: Box<[u8]>, target: NumSize) -> Option<String> {
    let ops = ops.iter().map(|v| *v as char).collect::<Vec<char>>();
    let res = compute24(&nums, &ops, target);
    if res.is_empty() {
        None
    } else {
        Some(res.join(","))
    }
}

#[test]
fn test_1() {
    const TARGET: NumSize = 24.0;
    let nums = vec![2, 4, 10, 10]
        .into_iter()
        .map(|v| v as NumSize)
        .collect::<Vec<NumSize>>();
    let ops = vec!['+', '-', '*', '/'];
    let res = compute24(&nums, &ops, TARGET);
    let set = std::collections::HashSet::<String>::from_iter(res.iter().map(|v| v.clone()));
    println!("{:?}", set.iter().collect::<Vec<&String>>());
    assert!(set.len() == 4);
}
