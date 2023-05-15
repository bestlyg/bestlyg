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

#[derive(Clone, PartialEq, Eq, Ord)]
struct Node(i32, i32);
impl Node {
    fn new(k: i32, v: i32) -> Self {
        Node(k, v)
    }
}
impl PartialOrd for Node {
    fn partial_cmp(&self, o: &Self) -> Option<std::cmp::Ordering> {
        self.1.partial_cmp(&o.1)
    }
}
impl Solution {
    pub fn max_equal_rows_after_flips(matrix: Vec<Vec<i32>>) -> i32 {
        let mut m = std::collections::HashMap::<String, i32>::new();
        for row in matrix {
            let mut s = String::new();
            for v in &row {
                s.push(((*v ^ row[0]) as u8 + b'0') as char);
            }
            *m.entry(s).or_insert(0) += 1;
        }
        let mut res = 0;
        for (_, v) in m.into_iter() {
            res = res.max(v);
        }
        res
    }
}
