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
    pub fn sum_of_power(nums: Vec<i32>) -> i32 {
        let mut nums: Vec<i64> = nums.into_iter().map(|v| v as i64).collect();
        nums.sort();
        let mut res = 0i64;
        let mut sum = 0i64;
        const MOD: i64 = 1000000000 + 7;
        for i in 0..nums.len() {
            let num = nums[i];
            let num2 = num * num % MOD;
            res += num2 * num % MOD + sum * num2 % MOD;
            sum = (sum * 2 % MOD + num) % MOD
        }
        (res % MOD) as i32
    }
}
