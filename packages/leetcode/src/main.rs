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
    pub fn minimum_jumps(forbidden: Vec<i32>, a: i32, b: i32, x: i32) -> i32 {
        let mut s = std::collections::HashSet::<i32>::new();
        for num in forbidden {
            s.insert(num);
        }
        let mut q = std::collections::VecDeque::<(i32, bool)>::new();
        q.push_back((0, false));
        let mut m = std::collections::HashMap::<i32, i32>::new();
        m.insert(0, 0b01);
        let mut size = 1;
        let mut step = 0;
        while let Some(cur) = q.pop_front() {
            if cur.0 == x {
                return step;
            }
            if cur.0 < 4000
                && (*m.get(&(cur.0 + a)).unwrap_or(&0) & 0b01) == 0
                && !s.contains(&(cur.0 + a))
            {
                let item = m.entry(cur.0 + a).or_insert(0);
                *item |= 0b01;
                q.push_back((cur.0 + a, false));
            }
            if cur.0 - b >= 0
                && !cur.1
                && (*m.get(&(cur.0 - b)).unwrap_or(&0) & 0b10) == 0
                && !s.contains(&(cur.0 - b))
            {
                let item = m.entry(cur.0 - b).or_insert(0);
                *item |= 0b10;
                q.push_back((cur.0 - b, true));
            }
            size -= 1;
            if size == 0 {
                size = q.len();
                step += 1;
            }
        }
        -1
    }
}
