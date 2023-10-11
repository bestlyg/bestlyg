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
    pub fn top_students(
        positive_feedback: Vec<String>,
        negative_feedback: Vec<String>,
        report: Vec<String>,
        student_id: Vec<i32>,
        k: i32,
    ) -> Vec<i32> {
        use std::collections::HashSet;
        let pset = positive_feedback.into_iter().collect::<HashSet<_>>();
        let nset = negative_feedback.into_iter().collect::<HashSet<_>>();
        let n = report.len();
        let arr = (0..n)
            .map(|i| {
                report[i]
                    .split(' ')
                    .map(|s| {
                        if pset.contains(s) {
                            3
                        } else if nset.contains(s) {
                            -1
                        } else {
                            0
                        }
                    })
                    .sum()
            })
            .collect::<Vec<i32>>();
        let mut idxs = (0..n).collect::<Vec<usize>>();
        idxs.sort_by(|i1, i2| {
            let res = arr[*i2].cmp(&arr[*i1]);
            if res == Ordering::Equal {
                student_id[*i1].cmp(&student_id[*i2])
            } else {
                res
            }
        });
        idxs.into_iter()
            .enumerate()
            .filter(|(i, _)| *i < k as usize)
            .map(|(_, i)| student_id[i])
            .collect()
    }
}
