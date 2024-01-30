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
    pub fn minimum_seconds(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        let mut map: std::collections::HashMap<i32, Vec<usize>> = Default::default();
        for i in 0..n {
            map.entry(nums[i]).or_default().push(i);
        }
        map.into_iter()
            .map(|(_, arr)| {
                let mut cur = ((arr[0] + n - 1 - arr.last().unwrap()) as f64 / 2.0).ceil() as i32;
                for i in 1..arr.len() {
                    cur = cur.max((((arr[i] - arr[i - 1] - 1) as f64) / 2.0) as i32);
                }
                cur
            })
            .min()
            .unwrap()
    }
}
