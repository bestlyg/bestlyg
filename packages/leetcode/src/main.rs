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
    pub fn count_pairs(n: i32, edges: Vec<Vec<i32>>) -> i64 {
        let n = n as usize;
        let mut uf = UnionFind::new(n);
        for edge in edges {
            uf.uni(edge[0] as usize, edge[1] as usize);
        }
        (0..n)
            .map(|i| {
                if uf.data[i] != i {
                    0
                } else {
                    uf.cnt[i] * (n - uf.cnt[i])
                }
            })
            .sum()
            / 2
    }
}
