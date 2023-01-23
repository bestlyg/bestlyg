mod preclude;

use std::borrow::Borrow;
use std::borrow::BorrowMut;
use std::char::MAX;

use preclude::*;
fn main() {
    let func = Solution::max_happy_groups;
    let res = func(4, vec![1, 3, 2, 5, 2, 2, 1, 6]);
    println!("res = {res:#?}");
}
impl Solution {
    pub fn calculate_tax(brackets: Vec<Vec<i32>>, income: i32) -> f64 {
        let mut ans = 0f64;
        let mut prev = 0;
        for item in brackets {
            if prev > income {
                break;
            } else {
                ans += ((income.min(item[0]) - prev) * item[1]) as f64 / 100f64;
            }
            prev = item[0]
        }
        ans
    }
}
