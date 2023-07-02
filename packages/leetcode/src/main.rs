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

pub fn get_primes2(mut n: usize) -> Vec<bool> {
    n += 3;
    let mut primes = vec![true; n];
    primes[0] = false;
    primes[1] = false;
    for i in 2..n {
        if primes[i] {
            let mut j = 2;
            while i * j < n {
                primes[i * j] = false;
                j += 1;
            }
        }
    }
    primes
}

impl Solution {
    pub fn find_prime_pairs(n: i32) -> Vec<Vec<i32>> {
        let n = n as usize;
        let primes = get_primes2(n);
        let mut res = vec![];
        if n >= 2 && primes[n - 2] {
            res.push(vec![2, (n as i32) - 2]);
        }
        let mut i = 3;
        while i <= n / 2 {
            if primes[i] && primes[n - i] {
                res.push(vec![i as i32, (n - i) as i32]);
            }
            i += 2;
        }
        res
    }
}
