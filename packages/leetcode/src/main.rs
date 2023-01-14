mod preclude;

use std::char::MAX;

use preclude::*;
fn main() {
    let func = Solution::count_different_subsequence_gc_ds;
    let res = func(vec![5, 15, 40, 5, 6]);
    println!("res = {res:#?}");
}

impl Solution {
    fn gcd(a: i32, b: i32) -> i32 {
        if b == 0 {
            a
        } else {
            Solution::gcd(b, a % b)
        }
    }
    pub fn count_different_subsequence_gc_ds(nums: Vec<i32>) -> i32 {
        let mut max = 0;
        let mut ans = 0;
        let mut l = [false; 200005];
        for num in nums {
            max = max.max(num);
            l[num as usize] = true;
        }
        for i in 1..=max {
            if l[i as usize] {
                ans += 1;
                continue;
            }
            let mut j = 2;
            let mut cur = -1;
            while j * i <= max && cur != i {
                let num = i * j;
                if l[num as usize] {
                    cur = if cur == -1 {
                        num
                    } else {
                        Solution::gcd(cur, num)
                    }
                }
                j += 1;
            }
            if cur == i {
                ans += 1;
            }
        }
        ans
    }
}
