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
    pub fn max_subarray_sum_circular(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        let mut sums = vec![0];
        for num in &nums {
            sums.push(sums.last().unwrap() + num);
        }

        for num in &nums {
            sums.push(sums.last().unwrap() + num);
        }
        let mut q = std::collections::VecDeque::<usize>::new();
        for i in 1..=n {
            while !q.is_empty() && sums[*q.back().unwrap()] > sums[i] {
                q.pop_back();
            }
            q.push_back(i);
        }
        let mut res = i32::MIN;
        for i in (n + 1)..sums.len() {
            res = res.max(nums[i - n - 1]);
            while !q.is_empty() && *q.front().unwrap() < i - n {
                q.pop_front();
            }
            while !q.is_empty() && sums[*q.back().unwrap()] > sums[i] {
                q.pop_back();
            }
            if !q.is_empty() {
                res = res.max(sums[i] - sums[*q.front().unwrap()]);
            }
            q.push_back(i);
        }
        res
    }
}
