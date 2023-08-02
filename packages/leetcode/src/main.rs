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
    pub fn flipgame(fronts: Vec<i32>, backs: Vec<i32>) -> i32 {
        let n = fronts.len();
        let mut s = std::collections::HashSet::<i32>::new();
        for i in 0..n {
            if fronts[i] == backs[i] {
                s.insert(fronts[i]);
            }
        }
        for i in 0..n {
            if !s.contains(&fronts[i]) {
                res = res.min(fronts[i])
            }
            if !s.contains(&backs[i]) {
                res = res.min(backs[i])
            }
        }
        res % 3000
    }
}
