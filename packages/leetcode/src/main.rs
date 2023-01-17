mod preclude;

use std::char::MAX;

use preclude::*;
fn main() {
    let func = Solution::count_nice_pairs;
    let res = func(vec![42, 11, 1, 97]);
    println!("res = {res:#?}");
}

use std::collections::HashMap;
const MOD: i32 = 100000007;
impl Solution {
    pub fn count_nice_pairs(nums: Vec<i32>) -> i32 {
        let mut m = HashMap::<i32, i32>::new();
        let mut ans = 0;
        for num in nums {
            let k = num - Solution::rev(num);
            let v = if m.contains_key(&k) {
                m.get_mut(&k).unwrap()
            } else {
                m.insert(k, 0);
                m.get_mut(&k).unwrap()
            };
            ans = (ans + *v) % MOD;
            *v += 1;
        }
        ans
    }
    fn rev(num: i32) -> i32 {
        let mut num = num;
        let mut ans = 0;
        while num != 0 {
            ans = ans * 10 + num % 10;
            num /= 10;
        }
        ans
    }
}
