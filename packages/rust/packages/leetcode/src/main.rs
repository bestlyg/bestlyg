mod preclude;

use preclude::*;
fn main() {}

impl Solution {
    pub fn find_longest_chain(pairs: Vec<Vec<i32>>) -> i32 {
        let mut pairs = pairs;
        pairs.sort_by(|a, b| {
            if a[0] != b[0] {
                a[0].cmp(&b[0])
            } else {
                a[1].cmp(&b[1])
            }
        });
        let len = pairs.len();
        let mut dp = vec![1; len];
        let mut ans = 0;
        for i in 0..len {
            for j in 0..i {
                if pairs[j][1] < pairs[i][1] {
                    dp[i] = dp[i].max(dp[j] + 1)
                }
            }
            ans = ans.max(dp[i]);
        }
        println!("{dp:?}");
        ans
    }
}
