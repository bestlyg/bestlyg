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
    pub fn diagonal_sum(mat: Vec<Vec<i32>>) -> i32 {
        mat.into_iter().enumerate().fold(0, |mut sum, (i, row)| {
            sum += row[i] + row[row.len() - 1 - i];
            if i == row.len() - 1 - i {
                sum -= row[i];
            }
            sum
        })
    }
}
