mod preclude;
use rand::Rng;

use preclude::*;
fn main() {
    let res = Solution::find_crossing_time(
        10,
        6,
        vec![
            vec![2, 10, 5, 8],
            vec![3, 5, 2, 2],
            vec![5, 8, 10, 10],
            vec![7, 8, 8, 5],
            vec![5, 6, 6, 10],
            vec![6, 10, 6, 2],
        ],
    );
    println!("res = {res:#?}");
}

impl Solution {
    pub fn reinitialize_permutation(n: i32) -> i32 {
        let n = n as usize;
        let (mut l1, mut l2) = ((0..n).collect::<Vec<_>>(),vec![0;n] );
        let mut ans = 1;
        loop {
            let mut f = true;
            for i in 0..n {
                if i % 2 == 0 {
                    l2[i] = l1[i / 2];
                } else {
                    l2[i] = l1[n / 2 + (i - 1) / 2];
                }
                if l2[i] != i {
                    f = false;
                }
            }
            if f {
                break;
            }
            ans += 1;
            l1 = l2.clone();
        }
        ans
    }
}
