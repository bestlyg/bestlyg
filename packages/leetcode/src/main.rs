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
    pub fn summary_ranges(nums: Vec<i32>) -> Vec<String> {
        let mut res = vec![];
        if !nums.is_empty() {
            let mut prev = false;
            let mut cur = (0, 0);
            for num in nums {
                if !prev {
                    prev = true;
                    cur = (num, num);
                } else if cur.1 + 1 == num {
                    cur.1 = num;
                } else {
                    let item = if cur.0 == cur.1 {
                        cur.0.to_string()
                    } else {
                        let mut s = String::new();
                        s.push_str(&cur.0.to_string());
                        s.push_str("->");
                        s.push_str(&cur.1.to_string());
                        s
                    };
                    res.push(item);
                    cur = (num, num);
                }
            }
            if prev {
                let mut s = String::new();
                s.push_str(&cur.0.to_string());
                s.push_str("->");
                s.push_str(&cur.1.to_string());
                res.push(s);
            }
        }
        res
    }
}
