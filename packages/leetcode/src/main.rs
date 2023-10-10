mod preclude;

use core::num;

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
    pub fn sum_distance(nums: Vec<i32>, s: String, d: i32) -> i32 {
        let s = s.chars().into_iter().collect::<Vec<_>>();
        let n = nums.len();
        let mut res = 0;
        const MOD: i64 = 1000000007;
        let mut arr = vec![];
        for i in 0..n {
            arr.push(if s[i] == 'L' {
                (nums[i] - d) as i64
            } else {
                (nums[i] + d) as i64
            })
        }
        arr.sort();
        for i in 1..n {
            let v = (arr[i] - arr[i - 1]) % MOD * ((n as i64) - i as i64) * (i as i64);
            res = (res + v) % MOD;
        }
        res as i32
    }
}
