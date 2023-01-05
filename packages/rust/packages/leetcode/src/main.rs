mod preclude;

use std::borrow::Borrow;

use preclude::*;
fn main() {
    let nums = vec![1, 4, 2, 7];
    let low = 2;
    let high = 6;
    println!("{}", Solution::count_pairs(nums, low, high));
}

impl Solution {
    pub fn count_pairs(nums: Vec<i32>, low: i32, high: i32) -> i32 {
        let mut ans = 0;
        for i in 0..nums.len() {
            for j in i + 1..nums.len() {
                let val = nums[i] ^ nums[j];
                if val >= low && val <= high {
                    ans += 1;
                }
            }
        }
        ans
    }
}
