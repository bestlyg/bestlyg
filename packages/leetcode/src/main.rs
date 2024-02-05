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
    pub fn max_result(mut nums: Vec<i32>, k: i32) -> i32 {
        let k = k as usize;
        let n = nums.len();
        let mut q = std::collections::VecDeque::<usize>::new();
        for i in 0..n {
            while let Some(front) = q.front() {
                if *front < i - k {
                    q.pop_front();
                } else {
                    break;
                }
            }
            if let Some(front) = q.front() {
                nums[i] += nums[*front];
            }
            while let Some(back) = q.back() {
                if nums[*back] <= nums[i] {
                    q.pop_back();
                } else {
                    break;
                }
            }
            q.push_back(i);
        }
        *nums.last().unwrap()
    }
}
