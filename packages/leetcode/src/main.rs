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
    pub fn split_num(num: i32) -> i32 {
        let mut num = num as usize;
        let mut nums = vec![0; 10];
        let mut res = vec![0; 2];
        let mut cur = 0;
        while num != 0 {
            nums[num % 10] += 1;
            num /= 10;
        }
        for i in 0..10 {
            while nums[i] != 0 {
                res[cur] = res[cur] * 10 + i;
                cur ^= 1;
                nums[i] -= 1;
            }
        }
        res.into_iter().sum::<usize>() as i32
    }
}
