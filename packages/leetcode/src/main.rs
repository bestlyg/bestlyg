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
    pub fn max_rep_opt1(text: String) -> i32 {
        let text = str_to_vec(&text);
        let mut m = vec![vec![]; 26];
        let mut res = 0;
        let mut n = text.len();
        {
            let mut i = 0;
            while i < n {
                let start = i;
                while i + 1 < n && text[i + 1] == text[start] {
                    i += 1;
                }
                m[text[start] as usize - 'a' as usize].push((start, i));
                res = res.max(i - start + 1);
            }
        }
        for list in m {
            let n = list.len();
            for i in 0..n {
                if n != 1 {
                    res = res.max(list[i].1 - list[i].0 + 2);
                }
                if i + 1 < n && list[i].1 + 1 == list[i + 1].0 - 1 {
                    let mut val = list[i].1 - list[i].0 + 1 + list[i + 1].1 - list[i + 1].0 + 1;
                    if !(i == 0 && i + 2 == n) {
                        val += 1;
                    }
                    res = res.max(val);
                }
            }
        }
        res as i32
    }
}
