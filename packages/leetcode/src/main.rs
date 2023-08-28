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
    pub fn insert(intervals: Vec<Vec<i32>>, new_interval: Vec<i32>) -> Vec<Vec<i32>> {
        use std::cmp::{max, min};
        let mut res = vec![];
        let n = intervals.len();
        let mut i = 0;
        while i < n && intervals[i][1] < new_interval[0] {
            res.push(intervals[i].clone());
            i += 1;
        }
        if i == n {
            res.push(new_interval);
        } else if intervals[i][0] > new_interval[1] {
            res.push(new_interval);
            while i < n {
                res.push(intervals[i].clone());
                i += 1;
            }
        } else {
            res.push(vec![
                min(intervals[i][0], new_interval[0]),
                max(intervals[i][1], new_interval[1]),
            ]);
            i += 1;
            while i < n {
                if res.last().unwrap()[1] >= intervals[i][0] {
                    res.last_mut().unwrap()[1] = max(res.last().unwrap()[1], intervals[i][1]);
                } else {
                    res.push(intervals[i].clone());
                }
                i += 1;
            }
        }
        res
    }
}
