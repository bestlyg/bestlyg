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
    pub fn num_factored_binary_trees(mut arr: Vec<i32>) -> i32 {
        const MOD: i64 = 1000000007;
        let n = arr.len();
        let mut res = 1;
        arr.sort();
        let mut m = std::collections::HashMap::<i32, usize>::new();
        for (i, num) in arr.iter().enumerate() {
            m.insert(*num, i);
        }
        let mut list = vec![1i64; n];
        for i in 1..n {
            for j in (0..i).rev() {
                if arr[i] % arr[j] == 0 && m.contains_key(&(arr[i] / arr[j])) {
                    let idx = m.get(&(arr[i] / arr[j])).unwrap();
                    list[i] = (list[i] + list[j] * list[*idx] % MOD) % MOD;
                }
            }
            res = (res + list[i]) % MOD;
        }
        res as i32
    }
}
