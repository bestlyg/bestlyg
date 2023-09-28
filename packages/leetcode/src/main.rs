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
    pub fn full_bloom_flowers(flowers: Vec<Vec<i32>>, people: Vec<i32>) -> Vec<i32> {
        let mut flist = vec![];
        for item in flowers {
            flist.push((item[0], 1));
            flist.push((item[1] + 1, -1));
        }
        flist.sort_by_cached_key(|o| o.0);
        let mut plist = (0..people.len()).collect::<Vec<usize>>();
        plist.sort_by_cached_key(|i| people[*i]);
        let mut res = vec![0; people.len()];
        let mut pidx = 0;
        let mut cur = 0;
        for (idx, d) in flist {
            while pidx < plist.len() && people[plist[pidx]] < idx {
                res[plist[pidx]] = cur;
                pidx += 1;
            }
            cur += d;
        }
        res
    }
}
