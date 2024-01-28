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
    pub fn can_measure_water(jug1_capacity: i32, jug2_capacity: i32, target_capacity: i32) -> bool {
        use std::cmp::min;
        use std::collections::{HashMap, VecDeque};
        let mut used: HashMap<i32, HashMap<i32, bool>> = Default::default();
        let mut q: VecDeque<(i32, i32)> = Default::default();
        q.push_back((0, 0));
        used.entry(0).or_default().entry(0).or_insert(true);
        while let Some((jug1, jug2)) = q.pop_front() {
            if jug1 == target_capacity || jug2 == target_capacity || jug1 + jug2 == target_capacity
            {
                return true;
            }
            let next = [
                [jug1_capacity, jug2],
                [0, jug2],
                [
                    min(jug1_capacity, jug1 + jug2),
                    jug2 - (min(jug1_capacity, jug1 + jug2) - jug1),
                ],
                [jug1, jug2_capacity],
                [jug1, 0],
                [
                    jug1 - (min(jug2_capacity, jug1 + jug2) - jug2),
                    min(jug2_capacity, jug1 + jug2),
                ],
            ];
            for [jug1, jug2] in next {
                let item = used.entry(jug1).or_default().entry(jug2).or_default();
                if !*item {
                    q.push_back((jug1, jug2));
                    *item = true;
                }
            }
        }
        false
    }
}
