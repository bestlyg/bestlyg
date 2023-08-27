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
    pub fn merge(mut intervals: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        intervals.sort_by_key(|o| o[0]);
        let mut res: Vec<Vec<i32>> = vec![];
        for item in intervals {
            if res.is_empty() || res.last().unwrap()[1] < item[0] {
                res.push(item);
            } else {
                res.last_mut().unwrap()[1] = res.last_mut().unwrap()[1].max(item[1]);
            }
        }
        res
    }
}
