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
    pub fn can_finish(num_courses: i32, prerequisites: Vec<Vec<i32>>) -> bool {
        use std::collections::HashSet;
        let num_courses = num_courses as usize;
        let mut used_count = 0;
        let mut parr: Vec<HashSet<usize>> = vec![Default::default(); num_courses];
        let mut carr: Vec<HashSet<usize>> = vec![Default::default(); num_courses];
        for item in prerequisites {
            let item0 = item[0] as usize;
            let item1 = item[1] as usize;
            carr[item0].insert(item1);
            parr[item1].insert(item0);
        }
        let mut q: Vec<usize> = vec![];
        for i in 0..num_courses {
            if parr[i].is_empty() {
                q.push(i);
            }
        }
        while let Some(cur) = q.pop() {
            used_count += 1;
            for child in &parr[cur] {
                carr[*child].remove(&cur);
                if carr[*child].is_empty() {
                    q.push(*child);
                }
            }
        }
        used_count == num_courses
    }
}
