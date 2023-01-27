mod preclude;

use std::borrow::Borrow;
use std::borrow::BorrowMut;
use std::char::MAX;

use preclude::*;
fn main() {
    let func = Solution::get_smallest_string;
    let res = func(5, 73);
    println!("res = {res:#?}");
}
impl Solution {
    pub fn ways_to_make_fair(nums: Vec<i32>) -> i32 {
        let mut l = [0; 2];
        let mut r = [0; 2];
        let mut ans = 0;
        for i in 0..nums.len() {
            r[i % 2] += nums[i];
        }
        for i in 0..nums.len() {
            r[i % 2] -= nums[i];
            if l[0] + r[1] == l[1] + r[0] {
                ans += 1;
            }
            l[i % 2] += nums[i];
        }
        ans
    }
}
