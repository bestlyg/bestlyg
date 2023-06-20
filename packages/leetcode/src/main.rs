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
    pub fn connect_two_groups(cost: Vec<Vec<i32>>) -> i32 {
        let n = cost.len();
        let m = cost[0].len();
        let mut cache = vec![vec![0x3f3f3f3f; 1 << m]; n + 1];
        cache[0][0] = 0;
        for i in 1..=n {
            for mask in 0..(1 << m) {
                for j in 0..m {
                    if (mask & (1 << j)) != 0 {
                        cache[i][mask] = cache[i][mask]
                            .min(cache[i][mask & !(1 << j)] + cost[i - 1][j])
                            .min(cache[i - 1][mask] + cost[i - 1][j])
                            .min(cache[i - 1][mask & !(1 << j)] + cost[i - 1][j]);
                    }
                }
            }
        }
        return cache[n][(1 << m) - 1];
    }
}
