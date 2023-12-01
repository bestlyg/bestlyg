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
    pub fn first_complete_index(arr: Vec<i32>, mat: Vec<Vec<i32>>) -> i32 {
        let n = mat.len();
        let m = mat[0].len();
        let mut map = std::collections::HashMap::<i32, (usize, usize)>::new();
        for i in 0..n {
            for j in 0..m {
                map.insert(mat[i][j], (i, j));
            }
        }
        let mut rows = vec![0; n];
        let mut cols = vec![0; m];
        for (idx, num) in arr.into_iter().enumerate() {
            let (i, j) = map.get(&num).unwrap();
            rows[*i] += 1;
            cols[*j] += 1;
            if rows[*i] == m || cols[*j] == n {
                return idx as i32;
            }
        }
        0
    }
}
