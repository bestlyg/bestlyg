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
    pub fn can_make_pali_queries(s: String, queries: Vec<Vec<i32>>) -> Vec<bool> {
        let mut list = vec![0];
        for c in s.as_bytes() {
            list.push(list.last().unwrap() + (1 << (*c - b'a')));
        }
        for v in &list {
            println!("{:b}", v);
        }
        let check = |q: Vec<i32>| -> bool {
            let l = q[0] as usize;
            let r = q[1] as usize;
            let k = q[2];
            let val = list[r + 1] ^ list[l];
            println!("q = {l},{r},{k}, bi = {:b}", val);
            let mut cnt = 0;
            for i in 0..26 {
                if (val & (1 << i)) != 0 {
                    cnt += 1;
                }
            }
            if (r - l + 1) % 2 == 0 {
                2 * k >= cnt
            } else {
                2 * k >= cnt - 1
            }
        };
        queries.into_iter().map(|q| check(q)).collect()
    }
}
