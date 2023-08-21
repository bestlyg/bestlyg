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
    pub fn can_change(start: String, target: String) -> bool {
        let start = str_to_vec(&start);
        let target = str_to_vec(&target);
        let n = start.len();
        let (mut i1, mut i2) = (0, 0);
        while i1 < n && start[i1] == '_' {
            i1 += 1;
        }
        while i2 < n && target[i2] == '_' {
            i2 += 1;
        }
        while (i1 < n && i2 < n) {
            if start[i1] != target[i2] {
                return false;
            }
            if start[i1] == 'L' && i1 < i2 {
                return false;
            }
            if start[i1] == 'R' && i1 > i2 {
                return false;
            }
            i1 += 1;
            i2 += 1;
            while i1 < n && start[i1] == '_' {
                i1 += 1;
            }
            while i2 < n && target[i2] == '_' {
                i2 += 1;
            }
        }
        i1 == n && i2 == n
    }
}
