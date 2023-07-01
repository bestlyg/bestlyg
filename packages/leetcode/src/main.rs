mod preclude;

use preclude::*;
fn main() {
    // let func = Solution::remove_subfolders;
    // let res = func(
    //     vec!["/a", "/a/b", "/c/d", "/c/d/e", "/c/f"]
    //         .into_iter()
    //         .map(|v| v.to_string())
    //         .collect(),
    // );
    // println!("res = {res:#?}");
}

impl Solution {
    pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
        let mut m = std::collections::HashMap::<i32, usize>::new();
        for i in 0..nums.len() {
            match m.get_mut(&(target - nums[i])) {
                Some(prev) => return vec![*prev as i32, i as i32],
                None => {
                    m.insert(nums[i], i);
                }
            }
        }
        vec![]
    }
}
