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
    pub fn min_days(n: i32) -> i32 {
        use std::collections::HashMap;
        let mut cache = HashMap::<usize, i32>::new();
        fn get(cache: &mut HashMap<usize, i32>, n: usize) -> i32 {
            if n == 0 {
                return 0;
            }
            let cached_val = cache.get(&n);
            match cached_val {
                Some(val) => *val,
                None => {
                    let mut res = get(cache, n - 1);
                    if n % 2 == 0 {
                        res = res.min(get(cache, n / 2));
                    }
                    if n % 3 == 0 {
                        res = res.min(get(cache, n / 3));
                    }
                    cache.insert(n, res);
                    res
                }
            }
        }
        get(&mut cache, n as usize)
    }
}
