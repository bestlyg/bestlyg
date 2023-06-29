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
    pub fn reconstruct_matrix(mut upper: i32, mut lower: i32, colsum: Vec<i32>) -> Vec<Vec<i32>> {
        let n = colsum.len();
        let mut list1 = vec![0; n];
        let mut list2 = vec![0; n];
        for i in 0..n {
            if colsum[i] == 2 {
                list1[i] = 1;
                list2[i] = 1;
                if upper <= 0 || lower <= 0 {
                    return vec![];
                }
                upper -= 1;
                lower -= 1;
            }
        }
        for i in 0..n {
            if colsum[i] == 1 {
                if upper > 0 {
                    list1[i] = 1;
                    upper -= 1;
                } else if lower > 0 {
                    list2[i] = 1;
                    lower -= 1;
                } else {
                    return vec![];
                }
            }
        }
        if upper > 0 || lower > 0 {
            vec![]
        } else {
            vec![list1, list2]
        }
    }
}
