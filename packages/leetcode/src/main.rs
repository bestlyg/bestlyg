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
    pub fn add_negabinary(mut arr1: Vec<i32>, mut arr2: Vec<i32>) -> Vec<i32> {
        arr1.reverse();
        arr2.reverse();
        for i in 0..arr1.len().max(arr2.len()) {
            if i == arr1.len() {
                arr1.push(0);
            }
            if i == arr2.len() {
                arr2.push(0);
            }
        }
        let mut res = vec![];
        let (mut i, mut add) = (0, 0);
        while i < arr1.len() {
            match arr1[i] + arr2[i] + add {
                -1 => {
                    res.push(1);
                    add = 1;
                }
                0 => {
                    res.push(0);
                    add = 0;
                }
                1 => {
                    res.push(1);
                    add = 0;
                }
                2 => {
                    res.push(0);
                    add = -1;
                }
                3 => {
                    res.push(1);
                    add = -1;
                }
                _ => {}
            }
            if i == arr1.len() - 1 && add != 0 {
                arr1.push(0);
                arr2.push(0);
            }
            i += 1;
        }
        while res.len() > 1 && *res.last().unwrap() == 0 {
            res.pop();
        }
        res.reverse();
        res
    }
}
