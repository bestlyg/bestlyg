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
    pub fn schedule_course(mut courses: Vec<Vec<i32>>) -> i32 {
        courses.sort_by_key(|o| o[1]);
        let mut sum = 0;
        let mut q = std::collections::BinaryHeap::<i32>::new();
        for course in courses {
            sum += course[0];
            q.push(course[0]);
            if sum > course[1] {
                sum -= q.pop().unwrap();
            }
        }
        q.len() as i32
    }
}
