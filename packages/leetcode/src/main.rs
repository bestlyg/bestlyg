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
    pub fn find_max_value_of_equation(points: Vec<Vec<i32>>, k: i32) -> i32 {
        let mut q = std::collections::VecDeque::<Vec<i32>>::new();
        let mut res = i32::MIN;
        for cur in points {
            while let Some(prev) = q.front() {
                if cur[0] - prev[0] > k {
                    q.pop_front();
                } else {
                    break;
                }
            }
            if let Some(prev) = q.front() {
                res = res.max(cur[0] + cur[1] + prev[1] - prev[0]);
            }
            while let Some(prev) = q.back() {
                if prev[1] - prev[0] < cur[1] - cur[0] {
                    q.pop_back();
                } else {
                    break;
                }
            }
            q.push_back(cur);
        }
        res
    }
}
