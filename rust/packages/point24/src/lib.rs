mod node;
mod utils;

use node::Node;
pub use utils::*;

use wasm_bindgen::prelude::*;

#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

pub fn compute24_v1(nums: &[NumSize], ops: &[char], target: NumSize) -> Vec<String> {
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

#[wasm_bindgen]
pub fn compute24_wasm_v1(nums: Box<[NumSize]>, ops: Box<[u8]>, target: NumSize) -> Option<String> {
    let ops = ops.iter().map(|v| *v as char).collect::<Vec<char>>();
    let res = compute24_v1(&nums, &ops, target);
    if res.is_empty() {
        None
    } else {
        Some(res.join(","))
    }
}

pub fn compute24_v2(nums: &[NumSize], ops: &[char], target: NumSize) -> Vec<String> {
    use std::collections::HashMap;
    let mut cache = HashMap::<String, Vec<Vec<String>>>::new();
    fn next(
        cache: &mut HashMap<String, Vec<Vec<String>>>,
        ops: &[char],
        target: NumSize,
        mut nums: Vec<NumSize>,
    ) -> Vec<Vec<String>> {
        nums.sort_by(|a, b| (*a).partial_cmp(b).unwrap());
        let format_str = nums
            .iter()
            .map(|v| v.to_string())
            .collect::<Vec<String>>()
            .join(",");
        let insert_format_str = format_str.clone();
        if !cache.contains_key(&format_str) {
            if nums.len() == 1 {
                if (target - nums[0]).abs() <= EPSILON {
                    cache.insert(insert_format_str, vec![vec!["FIN".to_string()]]);
                } else {
                    cache.insert(insert_format_str, vec![]);
                }
            } else {
                let n = nums.len();
                let mut res = vec![];
                for i in 0..n {
                    for j in 0..n {
                        if i != j {
                            for op in ops {
                                let num = operation(nums[i], nums[j], *op);
                                let mut next_nums = vec![num];
                                for k in 0..n {
                                    if k != i && k != j {
                                        next_nums.push(nums[k]);
                                    }
                                }
                                next(cache, ops, target, next_nums)
                                    .into_iter()
                                    .filter(|v| !v.is_empty())
                                    .map(|mut v| {
                                        v.insert(
                                            0,
                                            format!("{} {} {}", nums[i], op, nums[j]).to_string(),
                                        );
                                        v
                                    })
                                    .for_each(|v| {
                                        res.push(v);
                                    });
                            }
                        }
                    }
                }
                cache.insert(insert_format_str, res);
            }
        }
        cache.get(&format_str).unwrap().clone()
    }
    next(
        &mut cache,
        ops,
        target,
        nums.iter().map(|v| *v).collect::<Vec<NumSize>>(),
    )
    .into_iter()
    .map(|l| {
        let mut s = String::new();
        s.push('[');
        s.push_str(&l.join(" -> "));
        s.push(']');
        s
    })
    .collect::<Vec<String>>()
}

#[wasm_bindgen]
pub fn compute24_wasm_v2(nums: Box<[NumSize]>, ops: Box<[u8]>, target: NumSize) -> Option<String> {
    let ops = ops.iter().map(|v| *v as char).collect::<Vec<char>>();
    let res = compute24_v2(&nums, &ops, target);
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
    let res = compute24_v1(&nums, &ops, TARGET);
    let set = std::collections::HashSet::<String>::from_iter(res.iter().map(|v| v.clone()));
    println!("{:?}", set.iter().collect::<Vec<&String>>());
    assert!(set.len() == 4);
}
