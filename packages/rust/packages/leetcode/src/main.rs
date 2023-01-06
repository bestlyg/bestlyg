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
    pub fn count_even(num: i32) -> i32 {
        return Solution::dfs(num, 0, 0) - 1;
    }
    fn dfs(num: i32, cur: i32, sum: i32) -> i32 {
        if cur > num {
            0
        } else {
            let mut ans = if sum % 2 == 0 { 1 } else { 0 };
            for i in 0..=9 {
                if cur * 10 + i == cur {
                    continue;
                }
                ans += Solution::dfs(num, cur * 10 + i, sum + i);
            }
            ans
        }
    }
}
