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
    pub fn second_greater_element(nums: Vec<i32>) -> Vec<i32> {
        let mut s1 = vec![];
        let mut s2 = vec![];
        let mut s3 = vec![];
        let mut res = vec![-1; nums.len()];
        for i in 0..nums.len() {
            while !s2.is_empty() && nums[*s2.last().unwrap()] < nums[i] {
                res[s2.pop().unwrap()] = nums[i];
            }
            while !s1.is_empty() && nums[*s1.last().unwrap()] < nums[i] {
                s3.push(s1.pop().unwrap());
            }
            while !s3.is_empty() {
                s2.push(s3.pop().unwrap());
            }
            s1.push(i);
        }
        res
    }
}
