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
    pub fn sample_stats(count: Vec<i32>) -> Vec<f64> {
        use std::cmp::{max, min};
        let (n, mut sum, mut minimum, mut maximum, mut cnt, mut mode, mut mode_cnt) =
            (count.len(), 0usize, 0usize, 0usize, 0usize, 0usize, 0usize);
        minimum = n - 1;
        for i in 0..n {
            let c = count[i] as usize;
            sum += c * i;
            cnt += c;
            if c != 0 {
                minimum = min(minimum, i);
                maximum = max(maximum, i);
            }
            if c > mode_cnt {
                mode = i;
                mode_cnt = c;
            }
        }
        let mean = (sum as f64) / (cnt as f64);
        let (mut num1, mut num2) = (-1f64, -1f64);
        let (mut imid1, mut imid2) = ((cnt as f64) / 2.0, ((cnt - 1) as f64) / 2.0);
        println!("imid1 = {imid1}, imid2 = {imid2}");
        for i in 0..n {
            let c = count[i] as f64;
            if num1 == -1.0 && imid1 - c < 0.0 {
                num1 = i as f64;
            }
            if num2 == -1.0 && imid2 - c < 0.0 {
                num2 = i as f64;
            }
            imid1 -= c;
            imid2 -= c;
        }
        return vec![
            minimum as f64,
            maximum as f64,
            mean,
            (num1 + num2) / 2.0,
            mode as f64,
        ];
    }
}
