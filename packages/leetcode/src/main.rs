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
    pub fn merge(nums1: &mut Vec<i32>, m: i32, nums2: &mut Vec<i32>, n: i32) {
        let m = m as usize;
        let n = n as usize;
        let mut i1 = m - 1;
        let mut i2 = n - 1;
        for idx in (0..nums1.len()).rev() {
            println!("i1 = {i1}, i2 = {i2}, idx = {idx}");
            if i2 < n || i1 < m && nums1[i1] > nums2[i2] {
                nums1[idx] = nums1[i1];
                i1 -= 1;
            } else {
                nums1[idx] = nums2[i2];
                i2 -= 1;
            }
        }
    }
}
