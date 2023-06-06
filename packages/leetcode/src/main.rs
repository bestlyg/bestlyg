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
    pub fn equal_pairs(grid: Vec<Vec<i32>>) -> i32 {
        let mut rows = std::collections::HashMap::<String, i32>::new();
        let mut res = 0;
        let n = grid.len();
        for i in 0..n {
            let mut key = String::new();
            for j in 0..n {
                key.push_str(&format!("{}", grid[i][j]));
                key.push(',');
            }
            *rows.entry(key).or_insert(0) += 1;
        }
        for j in 0..n {
            let mut key = String::new();
            for i in 0..n {
                key.push_str(&format!("{}", grid[i][j]));
                key.push(',');
            }
            res += *rows.entry(key).or_insert(0);
        }
        res
    }
}
