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

#[derive(Clone, PartialEq, Eq, Ord)]
struct Node(i32, i32);
impl Node {
    fn new(k: i32, v: i32) -> Self {
        Node(k, v)
    }
}
impl PartialOrd for Node {
    fn partial_cmp(&self, o: &Self) -> Option<std::cmp::Ordering> {
        self.1.partial_cmp(&o.1)
    }
}

impl Solution {
    pub fn min_difficulty(job_difficulty: Vec<i32>, d: i32) -> i32 {
        let d = d as usize;
        let n = job_difficulty.len();
        if n < d {
            -1
        } else {
            let mut num = 0;
            let mut dp = vec![vec![i32::MAX; n]; d];
            for i in 0..n {
                num = num.max(job_difficulty[i]);
                dp[0][i] = num;
            }
            for dd in 1..d {
                for i in dd..n {
                    num = 0;
                    for j in (dd..=i).rev() {
                        num = num.max(job_difficulty[j]);
                        dp[dd][i] = dp[dd][i].min(dp[dd - 1][j - 1] + num);
                    }
                }
            }
            dp[d - 1][n - 1]
        }
    }
}
