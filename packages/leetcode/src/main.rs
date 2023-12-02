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
    pub fn car_pooling(mut trips: Vec<Vec<i32>>, capacity: i32) -> bool {
        trips.sort_by_key(|o| o[1]);
        let mut size = 0;
        let mut q = std::collections::BinaryHeap::<(i32, i32)>::new();
        for item in trips {
            let (num, f, t) = (item[0], item[1], item[2]);
            while q.len() > 0 && -(*q.peek().unwrap()).0 <= f {
                size -= q.pop().unwrap().1;
            }
            while let Some(top) = q.peek() {
                if -top.0 <= f  {
                    
                }
            }
            if size + num > capacity {
                return false;
            }
            q.push((-t, num));
            size += num;
        }
        true
    }
}
