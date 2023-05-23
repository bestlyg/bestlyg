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
    pub fn largest_vals_from_labels(
        values: Vec<i32>,
        labels: Vec<i32>,
        num_wanted: i32,
        use_limit: i32,
    ) -> i32 {
        let n = values.len();
        let mut list = vec![];
        for i in 0..n {
            list.push(i);
        }
        list.sort_by_key(|i| values[*i]);
        let mut m = std::collections::HashMap::<i32, i32>::new();
        let mut res = 0;
        let mut cnt = 0;
        for i in (0..n).rev() {
            if cnt >= num_wanted {
                break;
            }
            let item = m.entry(labels[list[i]]).or_insert(0);
            if *item < use_limit {
                *item += 1;
                res += values[list[i]];
                cnt += 1;
            }
        }
        res
    }
}
